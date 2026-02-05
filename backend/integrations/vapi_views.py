from __future__ import annotations

import json
import logging
import re
from decimal import Decimal
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo

from django.conf import settings
from django.contrib.auth import get_user_model
from django.http import JsonResponse
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .models import CallSummary
from .summary_utils import infer_from_summary

User = get_user_model()
logger = logging.getLogger(__name__)


def _normalize_phone(phone: str) -> str:
    """Strip to digits (and leading +) for matching."""
    if not phone:
        return ""
    return re.sub(r"[^\d+]", "", phone.strip())


def _resolve_service_from_call_description(owner_id: int, call_service_name: str):
    """
    When call summary says e.g. 'leak repair in sink', match to a Service
    whose name appears in that text (e.g. 'Leak repair'). Prefer longest match.
    """
    from bookings.models import Service
    if not call_service_name:
        return None
    lower_desc = call_service_name.lower()
    candidates = list(
        Service.objects.filter(owner_id=owner_id, is_active=True).values_list("id", "name")
    )
    matches = [(sid, name) for sid, name in candidates if name and name.lower() in lower_desc]
    if not matches:
        return None
    # Prefer longest service name match (e.g. "Leak repair in sink" over "Leak")
    best = max(matches, key=lambda x: len(x[1]))
    return Service.objects.filter(id=best[0]).first()


def _create_alert_for_call_summary(instance: CallSummary) -> None:
    """Create an Alert so the user sees the new call in Alerts and dashboard. Never raises."""
    try:
        from notifications.models import Alert
        title = "New call"
        message = (instance.summary or "").strip() or f"Call from {instance.caller_name or instance.caller_number or 'Unknown'}"
        if len(message) > 500:
            message = message[:497] + "..."
        Alert.objects.create(
            owner_id=instance.owner_id,
            type="info",
            title=title,
            message=message,
            related_client_id=instance.related_client_id,
            related_booking_id=instance.related_booking_id,
        )
    except Exception as e:
        logger.exception("Vapi webhook: create_alert_for_call_summary failed: %s", e)


def _link_call_summary_to_booking_and_client(instance: CallSummary) -> None:
    """
    Try to set related_client and related_booking on a CallSummary by matching
    caller phone to a Client (or creating a new Client if no match), then
    finding or creating a Booking. Never raises; logs and returns on any error.
    """
    try:
        owner_id = instance.owner_id
        from clients.models import Client
        from bookings.models import Booking, Service

        caller = (_normalize_phone(instance.caller_number) or "").strip()
        caller_name = (instance.caller_name or "").strip() or "Caller"

        # Find or create Client
        related_client = None
        if caller:
            clients = list(
                Client.objects.filter(owner_id=owner_id).only("id", "phone_number")
            )
            for c in clients:
                if _normalize_phone(c.phone_number) and caller in _normalize_phone(c.phone_number):
                    related_client = c
                    break
                if _normalize_phone(c.phone_number) and _normalize_phone(c.phone_number) in caller:
                    related_client = c
                    break
        if not related_client and (instance.caller_name or instance.caller_number):
            # New caller → create Client so they appear in Customers
            related_client = Client.objects.create(
                owner_id=owner_id,
                name=caller_name,
                phone_number=instance.caller_number or "",
                email="",
            )
        if not related_client:
            return
        instance.related_client_id = related_client.id

        # Find existing booking around call time, or create one from the call
        call_time = instance.ended_at or instance.created_at
        if call_time and timezone.is_naive(call_time):
            call_time = timezone.make_aware(call_time)
        if call_time:
            window_start = call_time - timedelta(minutes=15)
            window_end = call_time + timedelta(minutes=2)
            booking = (
                Booking.objects.filter(
                    owner_id=owner_id,
                    client_id=related_client.id,
                    created_at__gte=window_start,
                    created_at__lte=window_end,
                )
                .order_by("-created_at")
                .first()
            )
            if booking:
                instance.related_booking_id = booking.id
        if not instance.related_booking_id and instance.service_name:
            # Create a placeholder booking from the call so it shows on Bookings page
            raw_name = instance.service_name.strip()
            service = (
                Service.objects.filter(owner_id=owner_id, name__iexact=raw_name).first()
                or _resolve_service_from_call_description(owner_id, raw_name)
                or Service.objects.filter(owner_id=owner_id, is_active=True).first()
            )
            start = (call_time or timezone.now()) + timedelta(days=1)
            start = start.replace(hour=9, minute=0, second=0, microsecond=0)
            if timezone.is_naive(start):
                start = timezone.make_aware(start)
            # All bookings are fixed at 30 minutes
            end = start + timedelta(minutes=30)
            booking = Booking.objects.create(
                owner_id=owner_id,
                client_id=related_client.id,
                service_id=service.id if service else None,
                starts_at=start,
                ends_at=end,
                status="confirmed",
                notes=f"From voice call: {(instance.summary or '')[:500]}",
            )
            instance.related_booking_id = booking.id
        instance.save(update_fields=["related_client_id", "related_booking_id"])
    except Exception as e:
        logger.exception("Vapi webhook: link_call_summary_to_booking_and_client failed: %s", e)


def _get_webhook_owner():
    """Resolve the owner user for incoming Vapi webhooks."""
    email = getattr(settings, "VAPI_DEFAULT_OWNER_EMAIL", None) or ""
    email = (email or "").strip()
    if email:
        try:
            return User.objects.get(email=email, is_active=True)
        except User.DoesNotExist:
            logger.warning("VAPI_DEFAULT_OWNER_EMAIL=%s not found, using first user", email)
    return User.objects.filter(is_active=True).order_by("id").first()


def _parse_iso_datetime(s: str | None):
    if not s:
        return None
    try:
        return datetime.fromisoformat(s.replace("Z", "+00:00"))
    except (ValueError, TypeError):
        return None


def _get_owner_by_webhook_token(token: str) -> User | None:
    """
    Resolve a business owner (User) from their vapi_webhook_token.
    Used both for inbound webhooks and for Vapi helper APIs
    (services + availability) that are called during a call.
    """
    token = (token or "").strip()
    if not token:
        return None
    return User.objects.filter(vapi_webhook_token=token, is_active=True).first()


def _process_vapi_webhook(request, owner: User) -> JsonResponse:
    """
    Process Vapi end-of-call-report payload and create/update CallSummary for the given owner.
    """
    try:
        body = json.loads(request.body or "{}")
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    message = body.get("message") or body
    if isinstance(message, dict) and message.get("type") == "end-of-call-report":
        payload = message
    else:
        payload = body

    call_id = (
        payload.get("call", {}).get("id")
        if isinstance(payload.get("call"), dict)
        else payload.get("callId") or payload.get("id") or ""
    )
    call_id = (call_id or "").strip()

    # Idempotency: update existing summary if we have a vapi call id
    instance = None
    if call_id:
        instance = CallSummary.objects.filter(
            owner=owner, vapi_call_id=call_id
        ).first()

    # Extract common Vapi end-of-call-report fields (names may vary by version).
    call = payload.get("call") if isinstance(payload.get("call"), dict) else {}
    transcript = payload.get("transcript") or call.get("transcript") or ""
    if isinstance(transcript, list):
        transcript = "\n".join(
            (t.get("message") or t.get("content") or str(t) for t in transcript)
        )
    transcript = (transcript or "")[:65535]

    summary_text = (payload.get("summary") or call.get("summary") or "")[:65535]
    customer = call.get("customer") or payload.get("customer") or {}
    if isinstance(customer, dict):
        caller_number = customer.get("number") or customer.get("phone") or ""
        caller_name = customer.get("name") or ""
    else:
        caller_number = payload.get("callerNumber") or payload.get("phone") or ""
        caller_name = payload.get("callerName") or ""

    # Duration
    duration_seconds = payload.get("duration") or call.get("duration")
    if duration_seconds is not None:
        try:
            duration_seconds = int(duration_seconds)
        except (TypeError, ValueError):
            duration_seconds = None

    # Started/ended
    started_at = _parse_iso_datetime(
        payload.get("startedAt") or call.get("startedAt")
    )
    ended_at = _parse_iso_datetime(
        payload.get("endedAt") or call.get("endedAt")
    )

    # Custom fields some assistants send (e.g. from tool calls or summary prompt)
    outcome = (payload.get("outcome") or payload.get("result") or "")[:64]
    service_name = (payload.get("serviceName") or payload.get("service") or "")[:255]
    price = payload.get("price")
    if price is not None:
        try:
            price = Decimal(str(price))
        except (TypeError, ValueError):
            price = None
    currency = (payload.get("currency") or "USD")[:8]

    # When Vapi doesn't send caller/service/outcome, infer from summary so UI shows them
    if summary_text:
        inferred = infer_from_summary(summary_text)
        if inferred:
            if not caller_name and inferred.get("caller_name"):
                caller_name = inferred["caller_name"]
            if not service_name and inferred.get("service_name"):
                service_name = inferred["service_name"]
            if not outcome and inferred.get("outcome"):
                outcome = inferred["outcome"]

    # Duration: use from payload or compute from started_at/ended_at
    if duration_seconds is None and started_at and ended_at:
        try:
            delta = ended_at - started_at
            duration_seconds = max(0, int(delta.total_seconds()))
        except (TypeError, ValueError):
            pass

    if instance:
        instance.transcript = transcript or instance.transcript
        instance.summary = summary_text or instance.summary
        instance.caller_name = caller_name or instance.caller_name
        instance.caller_number = caller_number or instance.caller_number
        instance.duration_seconds = duration_seconds if duration_seconds is not None else instance.duration_seconds
        instance.started_at = started_at or instance.started_at
        instance.ended_at = ended_at or instance.ended_at
        instance.outcome = outcome or instance.outcome
        instance.service_name = service_name or instance.service_name
        if price is not None:
            instance.price = price
        instance.currency = currency or instance.currency
        instance.save()
        _link_call_summary_to_booking_and_client(instance)
        logger.info("Vapi webhook: CallSummary updated id=%s", instance.id)
        return JsonResponse({"ok": True, "action": "updated", "id": instance.id})

    # Avoid creating a new row for every Vapi ping when there's no call_id and no real content
    if not call_id and not transcript.strip() and not summary_text.strip():
        logger.info("Vapi webhook: skipped create (no call_id and no transcript/summary)")
        return JsonResponse({"ok": True, "action": "skipped"})

    instance = CallSummary.objects.create(
        owner=owner,
        vapi_call_id=call_id or "",
        caller_name=caller_name,
        caller_number=caller_number,
        service_name=service_name,
        price=price,
        currency=currency,
        transcript=transcript,
        summary=summary_text,
        outcome=outcome,
        duration_seconds=duration_seconds,
        started_at=started_at,
        ended_at=ended_at,
    )
    _link_call_summary_to_booking_and_client(instance)
    _create_alert_for_call_summary(instance)
    logger.info("Vapi webhook: CallSummary created id=%s", instance.id)
    return JsonResponse({"ok": True, "action": "created"})


@csrf_exempt
@require_http_methods(["POST"])
def vapi_webhook(request):
    """
    Legacy single-tenant webhook. Uses VAPI_DEFAULT_OWNER_EMAIL or first user.
    For new clients use webhook_by_token (URL includes the client's token).
    """
    owner = _get_webhook_owner()
    if not owner:
        logger.warning("Vapi webhook: no owner user found, skipping")
        return JsonResponse({"ok": False, "reason": "no_owner"}, status=200)
    return _process_vapi_webhook(request, owner)


@csrf_exempt
@require_http_methods(["POST"])
def vapi_webhook_by_token(request, token: str):
    """
    Per-client webhook. URL: /api/v1/vapi/webhook/<token>/
    Resolve the client (User) by vapi_webhook_token and create/update CallSummary for that user.
    Use this URL when configuring each Vapi agent (one agent per client).
    """
    logger.info("Vapi webhook received: POST /api/v1/vapi/webhook/<token>/ (token=%s)", token[:8] + "...")
    try:
        owner = _get_owner_by_webhook_token(token)
        if not owner:
            logger.warning("Vapi webhook: unknown or inactive token")
            return JsonResponse({"ok": False, "reason": "unknown_token"}, status=200)
        return _process_vapi_webhook(request, owner)
    except Exception as e:
        logger.exception("Vapi webhook: unhandled error: %s", e)
        return JsonResponse(
            {"ok": False, "error": str(e)},
            status=500,
        )


@require_http_methods(["GET"])
def vapi_services_by_token(request, token: str) -> JsonResponse:
    """
    Lightweight services endpoint for Vapi.

    URL: /api/v1/vapi/services/<token>/

    Returns active services for the client identified by vapi_webhook_token.
    Intended to be called from the Vapi agent during a call (no JWT needed).
    """
    try:
        from bookings.models import Service

        owner = _get_owner_by_webhook_token(token)
        if not owner:
            return JsonResponse({"ok": False, "reason": "unknown_token"}, status=200)

        services = list(
            Service.objects.filter(owner=owner, is_active=True)
            .order_by("name")
            .values("id", "name", "category", "price", "currency", "is_active")
        )
        tz_str = (getattr(owner, "timezone", None) or "").strip() or "UTC"
        return JsonResponse({"ok": True, "services": services, "timezone": tz_str})
    except Exception as e:
        logger.exception("Vapi services endpoint failed: %s", e)
        return JsonResponse(
            {"ok": False, "error": "internal_error"},
            status=500,
        )


@require_http_methods(["GET"])
def vapi_available_slots_by_token(request, token: str) -> JsonResponse:
    """
    Availability endpoint for Vapi.

    URL: /api/v1/vapi/availability/<token>/?date=YYYY-MM-DD

    Returns free 30-minute slots for that date for the client identified
    by vapi_webhook_token. Intended for in-call availability checks.
    """
    from bookings.models import Booking

    owner = _get_owner_by_webhook_token(token)
    if not owner:
        return JsonResponse({"ok": False, "reason": "unknown_token"}, status=200)

    date_str = request.GET.get("date") or ""
    if not date_str:
        return JsonResponse(
            {"ok": False, "error": 'missing_param', "detail": 'Query param "date" (YYYY-MM-DD) is required'},
            status=400,
        )
    try:
        day = datetime.fromisoformat(date_str).date()
    except ValueError:
        return JsonResponse(
            {"ok": False, "error": "invalid_date", "detail": "Use YYYY-MM-DD"},
            status=400,
        )

    # Use owner's timezone from account settings so 08:00–18:00 is in their local time
    tz_str = (getattr(owner, "timezone", None) or "").strip() or "UTC"
    try:
        tz = ZoneInfo(tz_str)
    except Exception:
        tz = timezone.utc
        tz_str = "UTC"

    slot_minutes = 30
    start_hour = 8
    end_hour = 18

    # Build day window in owner's timezone, then convert to UTC for DB query
    day_start_local = datetime.combine(
        day,
        datetime.min.time().replace(hour=start_hour, minute=0, second=0, microsecond=0),
    ).replace(tzinfo=tz)
    day_end_local = datetime.combine(
        day,
        datetime.min.time().replace(hour=end_hour, minute=0, second=0, microsecond=0),
    ).replace(tzinfo=tz)
    day_start_utc = day_start_local.astimezone(timezone.utc)
    day_end_utc = day_end_local.astimezone(timezone.utc)

    existing = list(
        Booking.objects.filter(
            owner=owner,
            status="confirmed",
            starts_at__lt=day_end_utc,
            ends_at__gt=day_start_utc,
        ).values_list("starts_at", "ends_at")
    )

    slots: list[str] = []
    slot_start_local = day_start_local
    while slot_start_local < day_end_local:
        slot_end_local = slot_start_local + timedelta(minutes=slot_minutes)
        slot_start_utc = slot_start_local.astimezone(timezone.utc)
        slot_end_utc = slot_end_local.astimezone(timezone.utc)
        occupied = any(start < slot_end_utc and end > slot_start_utc for start, end in existing)
        if not occupied:
            slots.append(slot_start_local.strftime("%H:%M"))
        slot_start_local = slot_end_local

    return JsonResponse(
        {
            "ok": True,
            "date": date_str,
            "timezone": tz_str,
            "slot_minutes": slot_minutes,
            "slots": slots,
        }
    )

from __future__ import annotations

from django.db.models.signals import post_save
from django.dispatch import receiver
import logging

import requests

from .models import Alert
from .serializers import AlertSerializer
from .stream import push_alert_to_user

logger = logging.getLogger(__name__)


@receiver(post_save, sender=Alert)
def on_alert_created(sender, instance: Alert, created: bool, **kwargs) -> None:
    if not created:
        return
    try:
        payload = AlertSerializer(instance).data
        push_alert_to_user(instance.owner_id, payload)
    except Exception:
        # Never break main flow due to notification streaming issues
        logger.exception("Failed pushing alert to SSE stream")

    # Optionally send alert payload to an external webhook for SMS/WhatsApp/etc.
    try:
        owner = instance.owner
        if not getattr(owner, "sms_notifications", False):
            return
        webhook_url = (getattr(owner, "sms_webhook_url", "") or "").strip()
        if not webhook_url:
            return

        data = {
            "id": instance.id,
            "type": instance.type,
            "title": instance.title,
            "message": instance.message,
            "owner_email": owner.email,
            "related_booking_id": instance.related_booking_id,
            "related_client_id": instance.related_client_id,
            "created_at": instance.created_at.isoformat(),
        }
        # Small timeout so we don't block request processing
        requests.post(webhook_url, json=data, timeout=3)
    except Exception:
        # Swallow external notification errors; they should not affect core app
        logger.exception("Failed sending alert to external SMS/WhatsApp webhook")

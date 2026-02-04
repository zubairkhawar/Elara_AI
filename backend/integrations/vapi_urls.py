from __future__ import annotations

from django.urls import path

from . import vapi_views

urlpatterns: list = [
    # Inbound webhooks from Vapi (end-of-call reports)
    path("webhook/", vapi_views.vapi_webhook, name="webhook"),
    path("webhook/<str:token>/", vapi_views.vapi_webhook_by_token, name="webhook-by-token"),
    # Outbound helper APIs Vapi can call during a call
    # List services (with prices) for a specific client
    path(
        "services/<str:token>/",
        vapi_views.vapi_services_by_token,
        name="services-by-token",
    ),
    # Check available slots for a given date for that client
    path(
        "availability/<str:token>/",
        vapi_views.vapi_available_slots_by_token,
        name="availability-by-token",
    ),
]


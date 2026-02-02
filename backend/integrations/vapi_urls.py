from __future__ import annotations

from django.urls import path

from . import vapi_views

urlpatterns: list = [
    path("webhook/", vapi_views.vapi_webhook, name="webhook"),
    path("webhook/<str:token>/", vapi_views.vapi_webhook_by_token, name="webhook-by-token"),
]


from __future__ import annotations

from django.urls import path
from rest_framework import routers

from .views import ServiceViewSet


app_name = "bookings"

router = routers.DefaultRouter()
router.register("services", ServiceViewSet, basename="service")

urlpatterns: list = router.urls


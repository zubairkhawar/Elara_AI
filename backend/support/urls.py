from __future__ import annotations

from rest_framework import routers

from .views import SupportRequestViewSet

app_name = "support"

router = routers.DefaultRouter()
router.register("requests", SupportRequestViewSet, basename="support-request")

urlpatterns: list = router.urls


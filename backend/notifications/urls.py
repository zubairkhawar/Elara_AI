from __future__ import annotations

from rest_framework import routers

from .views import AlertViewSet

app_name = 'notifications'

router = routers.DefaultRouter()
router.register('', AlertViewSet, basename='alert')

urlpatterns: list = router.urls

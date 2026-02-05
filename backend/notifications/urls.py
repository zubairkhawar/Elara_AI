from __future__ import annotations

from django.urls import path
from rest_framework import routers

from .views import AlertViewSet, alerts_stream

app_name = 'notifications'

router = routers.DefaultRouter()
router.register('', AlertViewSet, basename='alert')

# List actions must be registered before router.urls so they match before the
# detail route (which would otherwise capture "clear_all" etc. as pk and return 405 for POST)
urlpatterns: list = [
    path('stream/', alerts_stream),
    path('clear_all/', AlertViewSet.as_view(actions={'post': 'clear_all'}), name='alert-clear-all'),
    path('mark_all_read/', AlertViewSet.as_view(actions={'post': 'mark_all_read'}), name='alert-mark-all-read'),
    path('unread_count/', AlertViewSet.as_view(actions={'get': 'unread_count'}), name='alert-unread-count'),
    *router.urls,
]

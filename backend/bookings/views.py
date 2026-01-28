from __future__ import annotations

from rest_framework import permissions, viewsets

from .models import Service
from .serializers import ServiceSerializer


class ServiceViewSet(viewsets.ModelViewSet):
    """
    CRUD endpoints for salon/business services that Elara can book.
    """

    serializer_class = ServiceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Only return services for the authenticated business owner.
        return Service.objects.filter(owner=self.request.user).order_by("name")


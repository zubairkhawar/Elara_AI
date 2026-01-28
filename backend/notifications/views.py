from __future__ import annotations

from django.db.models import Q
from django.utils import timezone
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.request import Request
from rest_framework.response import Response

from .models import Alert
from .serializers import AlertSerializer


class AlertViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for managing alerts/notifications.
    """
    serializer_class = AlertSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """Return alerts for the current user."""
        queryset = Alert.objects.filter(owner=self.request.user)
        
        # Filter by read/unread status
        is_read = self.request.query_params.get('is_read')
        if is_read is not None:
            is_read_bool = is_read.lower() == 'true'
            queryset = queryset.filter(is_read=is_read_bool)
        
        # Filter by type
        alert_type = self.request.query_params.get('type')
        if alert_type:
            queryset = queryset.filter(type=alert_type)
        
        return queryset.order_by('-created_at')

    @action(detail=True, methods=['post'])
    def mark_read(self, request: Request, pk: int = None) -> Response:
        """Mark a specific alert as read."""
        alert = self.get_object()
        if alert.owner != request.user:
            return Response(
                {'detail': 'Not found.'},
                status=status.HTTP_404_NOT_FOUND,
            )
        alert.mark_as_read()
        return Response(AlertSerializer(alert).data)

    @action(detail=False, methods=['post'])
    def mark_all_read(self, request: Request) -> Response:
        """Mark all unread alerts as read."""
        updated = Alert.objects.filter(
            owner=request.user,
            is_read=False,
        ).update(
            is_read=True,
            read_at=timezone.now(),
        )
        return Response({'marked_read': updated})

    @action(detail=False, methods=['get'])
    def unread_count(self, request: Request) -> Response:
        """Get count of unread alerts."""
        count = Alert.objects.filter(
            owner=request.user,
            is_read=False,
        ).count()
        return Response({'count': count})

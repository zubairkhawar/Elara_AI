from __future__ import annotations

from rest_framework import permissions, viewsets

from .models import SupportRequest
from .serializers import SupportRequestSerializer


class SupportRequestViewSet(viewsets.ModelViewSet):
    """
    Allow authenticated users to create and view their own support requests.
    """

    serializer_class = SupportRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return SupportRequest.objects.filter(owner=self.request.user).order_by(
            "-created_at"
        )


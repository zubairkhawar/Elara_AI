from __future__ import annotations

from rest_framework import serializers

from .models import Alert


class AlertSerializer(serializers.ModelSerializer):
    time_ago = serializers.SerializerMethodField()
    related_booking_id = serializers.IntegerField(source='related_booking.id', read_only=True, allow_null=True)
    related_client_id = serializers.IntegerField(source='related_client.id', read_only=True, allow_null=True)

    class Meta:
        model = Alert
        fields = [
            'id',
            'type',
            'title',
            'message',
            'is_read',
            'related_booking_id',
            'related_client_id',
            'created_at',
            'read_at',
            'time_ago',
        ]
        read_only_fields = ['id', 'created_at', 'read_at', 'time_ago']

    def get_time_ago(self, obj) -> str:
        """Calculate human-readable time ago."""
        from django.utils import timezone
        from datetime import timedelta

        now = timezone.now()
        diff = now - obj.created_at

        if diff < timedelta(minutes=1):
            return 'Just now'
        elif diff < timedelta(hours=1):
            minutes = int(diff.total_seconds() / 60)
            return f'{minutes} minute{"s" if minutes != 1 else ""} ago'
        elif diff < timedelta(days=1):
            hours = int(diff.total_seconds() / 3600)
            return f'{hours} hour{"s" if hours != 1 else ""} ago'
        elif diff < timedelta(days=7):
            days = diff.days
            return f'{days} day{"s" if days != 1 else ""} ago'
        else:
            return obj.created_at.strftime('%b %d, %Y')


class AlertMarkReadSerializer(serializers.Serializer):
    """Serializer for marking alerts as read."""
    pass

from __future__ import annotations

from django.conf import settings
from django.db import models


class Alert(models.Model):
    """
    Alert/Notification model for user notifications.
    """

    TYPE_CHOICES = [
        ('success', 'Success'),
        ('warning', 'Warning'),
        ('info', 'Info'),
        ('error', 'Error'),
    ]

    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='alerts',
    )
    type = models.CharField(
        max_length=20,
        choices=TYPE_CHOICES,
        default='info',
    )
    title = models.CharField(max_length=255)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    related_booking = models.ForeignKey(
        'bookings.Booking',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='alerts',
    )
    related_client = models.ForeignKey(
        'clients.Client',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='alerts',
    )
    created_at = models.DateTimeField(auto_now_add=True)
    read_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['owner', '-created_at']),
            models.Index(fields=['owner', 'is_read']),
        ]

    def __str__(self) -> str:
        return f"{self.title} - {self.owner.email}"

    def mark_as_read(self):
        """Mark alert as read."""
        from django.utils import timezone
        self.is_read = True
        self.read_at = timezone.now()
        self.save(update_fields=['is_read', 'read_at'])

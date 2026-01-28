from __future__ import annotations

from django.conf import settings
from django.db import models


class SupportRequest(models.Model):
    """
    A support/contact request submitted from the dashboard.
    """

    STATUS_CHOICES = [
        ("open", "Open"),
        ("in_progress", "In progress"),
        ("closed", "Closed"),
    ]

    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="support_requests",
    )
    contact_email = models.EmailField(
        blank=True,
        help_text="Preferred email to reply to. Defaults to account email if left blank.",
    )
    subject = models.CharField(max_length=255)
    message = models.TextField()
    status = models.CharField(
        max_length=32,
        choices=STATUS_CHOICES,
        default="open",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{self.owner.email} – {self.subject[:40]}"


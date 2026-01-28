from __future__ import annotations

from django.conf import settings
from django.db import models


class Client(models.Model):
    """
    Represents an end-customer of a business using Elara.

    Extended with basic CRM fields like notes and tags.
    """

    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="clients",
    )
    name = models.CharField(max_length=255)
    email = models.EmailField(blank=True)
    phone_number = models.CharField(max_length=50, blank=True)
    notes = models.TextField(blank=True)
    tags = models.CharField(
        max_length=255,
        blank=True,
        help_text="Comma-separated tags for quick segmentation (e.g. VIP, Hair, Laser).",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return self.name


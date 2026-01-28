from __future__ import annotations

from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import SupportRequest


User = get_user_model()


class SupportRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = SupportRequest
        fields = [
            "id",
            "contact_email",
            "subject",
            "message",
            "status",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "status", "created_at", "updated_at"]

    def create(self, validated_data):
        request = self.context.get("request")
        assert request is not None

        user: User = request.user
        if not validated_data.get("contact_email"):
            validated_data["contact_email"] = user.email

        validated_data["owner"] = user
        return super().create(validated_data)


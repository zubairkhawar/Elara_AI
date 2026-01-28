from __future__ import annotations

from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import Service


User = get_user_model()


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = [
            "id",
            "name",
            "price",
            "currency",
            "is_active",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def create(self, validated_data):
        request = self.context.get("request")
        assert request is not None
        validated_data["owner"] = request.user
        return super().create(validated_data)


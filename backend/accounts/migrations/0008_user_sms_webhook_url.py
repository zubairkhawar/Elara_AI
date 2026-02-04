from __future__ import annotations

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0007_user_vapi_refs_and_setup"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="sms_webhook_url",
            field=models.URLField(
                blank=True,
                help_text=(
                    "Optional webhook URL to send alerts for SMS/WhatsApp or other apps. "
                    "When SMS notifications are enabled, a POST with alert details "
                    "will be sent to this URL."
                ),
            ),
        ),
    ]


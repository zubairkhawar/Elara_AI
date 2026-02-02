# Generated manually for per-client Vapi webhook routing

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0005_remove_user_timezone'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='vapi_webhook_token',
            field=models.CharField(
                blank=True,
                help_text="Token for this client's Vapi webhook URL. Leave blank, then use admin action 'Generate Vapi webhook token'. Webhook URL: /api/v1/vapi/webhook/<token>/",
                max_length=64,
                unique=True,
            ),
        ),
    ]

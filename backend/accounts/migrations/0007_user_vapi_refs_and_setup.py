# Generated manually: Vapi reference fields + setup status + admin notes

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0006_add_vapi_webhook_token'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='vapi_assistant_id',
            field=models.CharField(
                blank=True,
                help_text='Vapi Assistant/Agent ID from the Vapi dashboard. For your reference and quick lookup.',
                max_length=255,
            ),
        ),
        migrations.AddField(
            model_name='user',
            name='vapi_phone_number',
            field=models.CharField(
                blank=True,
                help_text="Phone number assigned to this client's Vapi agent (e.g. +1 555…). For support reference.",
                max_length=50,
            ),
        ),
        migrations.AddField(
            model_name='user',
            name='setup_status',
            field=models.CharField(
                choices=[
                    ('not_started', 'Not started'),
                    ('token_generated', 'Token generated'),
                    ('vapi_configured', 'Vapi agent configured'),
                    ('client_notified', 'Client notified'),
                    ('live', 'Live'),
                ],
                default='not_started',
                help_text='Track onboarding progress for this client.',
                max_length=32,
            ),
        ),
        migrations.AddField(
            model_name='user',
            name='admin_notes',
            field=models.TextField(
                blank=True,
                help_text='Internal notes about this client (not visible to the client).',
            ),
        ),
    ]

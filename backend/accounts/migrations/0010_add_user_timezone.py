from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0009_add_signup_source"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="timezone",
            field=models.CharField(
                blank=True,
                default="UTC",
                help_text="User's timezone for dashboard (e.g. Asia/Karachi, Europe/London).",
                max_length=64,
            ),
        ),
    ]

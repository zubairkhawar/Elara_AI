"""
Management command to create a superuser if one doesn't exist.
Safe to run multiple times - won't create duplicate users.
"""
import os
from django.core.management.base import BaseCommand
from accounts.models import User


class Command(BaseCommand):
    help = 'Creates a superuser if one does not exist'

    def handle(self, *args, **options):
        email = os.environ.get('SUPERUSER_EMAIL', 'zubairkhawer@gmail.com')
        password = os.environ.get('SUPERUSER_PASSWORD')

        if not password:
            self.stdout.write(
                self.style.WARNING(
                    'SUPERUSER_PASSWORD not set. Skipping superuser creation.'
                )
            )
            return

        if User.objects.filter(email=email).exists():
            self.stdout.write(
                self.style.SUCCESS(f'Superuser with email {email} already exists.')
            )
            return

        User.objects.create_superuser(
            email=email,
            password=password,
        )
        self.stdout.write(
            self.style.SUCCESS(f'Successfully created superuser: {email}')
        )

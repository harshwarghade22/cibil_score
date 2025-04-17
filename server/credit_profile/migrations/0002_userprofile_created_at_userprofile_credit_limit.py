# Generated by Django 5.0.2 on 2025-04-16 07:10

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('credit_profile', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='created_at',
            field=models.DateField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='userprofile',
            name='credit_limit',
            field=models.DecimalField(decimal_places=2, default=100000, max_digits=10),
        ),
    ]

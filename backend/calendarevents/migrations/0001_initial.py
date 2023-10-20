# Generated by Django 4.2.3 on 2023-09-26 19:28

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CalendarEvent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('CategoryColor', models.CharField(default='#1aaa55', max_length=7)),
                ('Description', models.CharField(blank=True, max_length=255, null=True)),
                ('Subject', models.CharField(blank=True, max_length=100, null=True)),
                ('Location', models.CharField(blank=True, max_length=100, null=True)),
                ('StartTime', models.DateTimeField(blank=True, null=True)),
                ('EndTime', models.DateTimeField(blank=True, null=True)),
                ('start_time_zone', models.CharField(blank=True, max_length=100, null=True)),
                ('recurrencerule', models.CharField(blank=True, max_length=100, null=True)),
                ('isallday', models.BooleanField(blank=True, default=False, null=True)),
            ],
        ),
    ]

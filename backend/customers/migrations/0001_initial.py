# Generated by Django 4.2.3 on 2023-09-24 18:46

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('membership', models.CharField(max_length=255)),
                ('joined_at', models.DateTimeField(auto_now_add=True)),
                ('total_expenditure', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
            ],
        ),
    ]

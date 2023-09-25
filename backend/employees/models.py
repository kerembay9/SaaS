from django.db import models

# Create your models here.

class Employee(models.Model):
    name = models.CharField(blank=False, max_length=255)
    joined_at = models.DateTimeField(auto_now_add=True)
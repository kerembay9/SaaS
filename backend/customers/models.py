from django.db import models

# Create your models here.

class Customer(models.Model):
    name = models.CharField(blank=False, max_length=255)
    membership = models.CharField(blank=False,max_length=255)
    joined_at = models.DateTimeField(auto_now_add=True)
    total_expenditure = models.DecimalField(default = 0,max_digits=10, decimal_places=2)
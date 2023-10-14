from django.db import models

# Create your models here.

class Customer(models.Model):
    name = models.CharField(blank=False, max_length=255)
    membership = models.CharField(blank=False,max_length=255)
    joined_at = models.DateField(auto_now_add=True)
    total_expenditure = models.DecimalField(default = 0,max_digits=10, decimal_places=2)
class ClickingInstance(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    x = models.DecimalField(max_digits=20, decimal_places=16)
    y = models.DecimalField(max_digits=20, decimal_places=16)
    timestamp = models.DateTimeField(auto_now_add=True)
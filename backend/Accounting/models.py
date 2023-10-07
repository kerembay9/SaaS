from django.db import models

# Create your models here.
class Accounting(models.Model):
    name = models.CharField(blank=False, max_length=255)
    price = models.DecimalField(blank=False, default = 0,max_digits=10, decimal_places=2)
    joined_at = models.DateField(auto_now_add=True)
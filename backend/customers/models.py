from django.db import models

# Create your models here.
class Customer(models.Model):
    name= models.CharField(max_length=255,blank=True, null=True)
    surname= models.CharField(max_length=255,blank=True, null=True)
    purchase= models.CharField(max_length=255,blank=True)
    joindate= models.DateField(auto_now_add=True)
    total_revenue=models.DecimalField(max_digits=15, decimal_places=2, default=0.00)

    @property
    def sale_price(self):
        return "%.2f" %(float(self.total_revenue)*0.8)
       
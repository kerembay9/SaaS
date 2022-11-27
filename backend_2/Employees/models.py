from django.db import models


# Create your models here.
class Employee(models.Model):
    name = models.CharField(max_length=255)
    surname = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    created_on = models.DateTimeField(auto_now_add=True)
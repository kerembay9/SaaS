from django.db import models

# Create your models here.

class Customer(models.Model):
    GENDER_CHOICES = (
        ('E', 'Erkek'),
        ('K', 'Kadın'),
    )
    BLOOD_TYPE_CHOICES = (
        ('A+', 'A+'),
        ('A-', 'A-'),
        ('B+', 'B+'),
        ('B-', 'B-'),
        ('AB+', 'AB+'),
        ('AB-', 'AB-'),
        ('O+', 'O+'),
        ('O-', 'O-'),
    )
    name = models.CharField(blank=False, max_length=255)
    membership = models.CharField(blank=False,max_length=255)
    phone = models.DecimalField(max_digits=11,decimal_places=0,blank=True,default=0)
    age = models.DecimalField(max_digits=3,decimal_places=0,blank=True,default=0)
    weight = models.DecimalField(max_digits=3,decimal_places=0,blank=True,default=0)
    height = models.DecimalField(max_digits=3,decimal_places=0,blank=True,default=0)
    tc_no =models.DecimalField(max_digits=11,decimal_places=0,blank=True,default=0)
    joined_at = models.DateField(auto_now_add=True)
    total_expenditure = models.DecimalField(default = 0,max_digits=10, decimal_places=2)
    blood_type = models.CharField(max_length=3, choices=BLOOD_TYPE_CHOICES,blank=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES,blank=True)
    @property
    def bmi(self):
        # Calculate BMI (weight in kg / (height in meters) ^ 2)
        height_in_meters = float(self.height) / 100.0
        if height_in_meters != 0:
            bmi = float(self.weight) / (height_in_meters ** 2)
            return bmi
        return None
    @property
    def bmi_category(self):
        bmi = self.bmi
        if self.gender == 'M':
            if bmi < 20.7:
                return 'Underweight'
            elif 20.7 <= bmi < 26.4:
                return 'Normal'
            elif 26.4 <= bmi < 27.8:
                return 'Marginally Overweight'
            elif 27.8 <= bmi < 31.1:
                return 'Overweight'
            else:
                return 'Obese'
        elif self.gender == 'F':
            if bmi < 19.1:
                return 'Underweight'
            elif 19.1 <= bmi < 25.8:
                return 'Normal'
            elif 25.8 <= bmi < 27.3:
                return 'Marginally Overweight'
            elif 27.3 <= bmi < 32.3:
                return 'Overweight'
            else:
                return 'Obese'
class ClickingInstance(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    x = models.DecimalField(max_digits=20, decimal_places=16)
    y = models.DecimalField(max_digits=20, decimal_places=16)
    pain_level= models.IntegerField(default=1)
    timestamp = models.DateTimeField(auto_now_add=True)
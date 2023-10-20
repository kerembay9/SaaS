from django.db import models

# Create your models here.
class CalendarEvent(models.Model):
    CategoryColor = models.CharField(max_length=7, default='#1aaa55')
    Description = models.CharField(max_length=255, blank=True, null=True)
    Subject = models.CharField(max_length=100, blank=True, null=True)
    Location = models.CharField(max_length=100, blank=True, null=True)
    StartTime = models.DateTimeField(blank=True, null=True)
    start_time_zone = models.CharField(max_length=100, blank=True, null=True)
    EndTime = models.DateTimeField( blank=True, null=True)
    start_time_zone = models.CharField(max_length=100, blank=True, null=True)
    recurrencerule = models.CharField(max_length=100, blank=True, null=True)
    isallday = models.BooleanField(default = False, blank=True, null=True)

    def __str__(self):
        return self.Subject
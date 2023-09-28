from django.db import models

# Create your models here.

class Kanban(models.Model):
    summary = models.CharField(max_length=512)
    status = models.CharField(max_length=100)

    def __str__(self):
        return self.summary
from django.db import models

# Create your models here.

class Kanban(models.Model):
    Summary = models.CharField(max_length=512)
    Status = models.CharField(max_length=100)

    def __str__(self):
        return self.summary
    def Id(self):
        return str('Task'+self.id)
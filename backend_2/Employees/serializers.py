from rest_framework import serializers
from .models import Employee

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model= Employee
        fields=[
            'name',
            'surname',
            'phone',
            'email',
            'created_on',
            'id',
        ]
        
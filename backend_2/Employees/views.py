from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions
# Create your views here.
from Employees.serializers import EmployeeSerializer
from .models import Employee

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [permissions.IsAuthenticated]
from django.shortcuts import render
from rest_framework import generics
# Create your views here.
from Employees.serializers import EmployeeSerializer
from .models import Employee


class EmployeeUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
class EmployeeView(generics.ListCreateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

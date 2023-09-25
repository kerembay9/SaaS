from rest_framework import generics, status
from rest_framework.response import Response
from .models import Employee
from .serializers import EmployeeSerializer
from rest_framework.decorators import api_view

class EmployeeListCreateView(generics.ListCreateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

class EmployeeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

@api_view(['POST'])
def bulk_delete_employees(request):
    employee_ids = request.data.get('employee_ids', [])
    print(employee_ids, 'are the ids')
    
    # You can add additional authorization and validation checks here.
    
    # Delete the selected employees
    deleted_count = Employee.objects.filter(id__in=employee_ids).delete()
    
    return Response({'message': f'{deleted_count[0]} employees deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
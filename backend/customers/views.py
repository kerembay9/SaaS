from rest_framework import generics, status
from rest_framework.response import Response
from .models import Customer
from .serializers import CustomerSerializer
from rest_framework.decorators import api_view

class CustomerListCreateView(generics.ListCreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class CustomerDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

@api_view(['POST'])
def bulk_delete_customers(request):
    customer_ids = request.data.get('customer_ids', [])
    print(customer_ids, 'are the ids')
    
    # You can add additional authorization and validation checks here.
    
    # Delete the selected customers
    deleted_count = Customer.objects.filter(id__in=customer_ids).delete()
    
    return Response({'message': f'{deleted_count[0]} customers deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
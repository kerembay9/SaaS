from rest_framework import generics, status, viewsets
from rest_framework.response import Response
from .models import ClickingInstance, Customer
from .serializers import ClickingInstanceCreateSerializer, ClickingInstanceSerializer, CustomerSerializer
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

class ClickingInstanceListCreateViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        customer_id = self.kwargs['customerpk']
        return ClickingInstance.objects.filter(customer=customer_id)    
    serializer_class = ClickingInstanceSerializer

    def create(self, request, *args, **kwargs):
        # Ensure that the customer is associated with the clicking instance.
        customer_id = request.data.get('customer', None)
        if not customer_id:
            return Response({'customer': ['This field is required.']}, status=status.HTTP_400_BAD_REQUEST)
        
        customer = Customer.objects.get(pk=customer_id)
        serializer = ClickingInstanceCreateSerializer(data=request.data)

        if serializer.is_valid():
            clicking_instance = serializer.save(customer=customer)
            return Response(ClickingInstanceSerializer(clicking_instance).data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ClickingInstanceDetailUpdateViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        customer_id = self.kwargs['customerpk']
        click_instance_id = self.kwargs['pk']
        return ClickingInstance.objects.filter(customer=customer_id, pk=click_instance_id)    
    serializer_class = ClickingInstanceSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = ClickingInstanceSerializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
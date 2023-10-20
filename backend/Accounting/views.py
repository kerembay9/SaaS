from django.shortcuts import render

# Create your views here.
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Accounting
from .serializers import AccountingSerializer
from rest_framework.decorators import api_view

class AccountingListCreateView(generics.ListCreateAPIView):
    queryset = Accounting.objects.all()
    serializer_class = AccountingSerializer

class AccountingDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Accounting.objects.all()
    serializer_class = AccountingSerializer

@api_view(['POST'])
def bulk_delete_accountings(request):
    accounting_ids = request.data.get('accounting_ids', [])
    print(accounting_ids, 'are the ids')
    
    # You can add additional authorization and validation checks here.
    
    # Delete the selected accountings
    deleted_count = Accounting.objects.filter(id__in=accounting_ids).delete()
    
    return Response({'message': f'{deleted_count[0]} accountings deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
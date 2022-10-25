from pyexpat import model
from statistics import mode
from django.forms.models import model_to_dict
from django.http import JsonResponse
from customers.models import Customer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from customers.serializers import CustomerSerializer

@api_view(['POST'])
def api_home( request, *args, **kwargs):
    serializer= CustomerSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        instance = serializer.save()
        print(instance)
        return Response(serializer.data)
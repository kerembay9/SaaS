from rest_framework import  generics, mixins
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Customer
from .serializers import CustomerSerializer
from api.mixins import StaffEditorPermissionMixin


class CustomerListCreateAPIView(
    StaffEditorPermissionMixin,
    generics.ListCreateAPIView):
    queryset= Customer.objects.all()
    serializer_class = CustomerSerializer

    def perform_create(self, serializer):
        print(serializer.validated_data)
        serializer.save()
class CustomerDetailAPIView(
    StaffEditorPermissionMixin,
    generics.RetrieveAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class CustomerUpdateAPIView(
    StaffEditorPermissionMixin
    ,generics.UpdateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    lookup_field = 'pk'

    def perform_update(self, serializer):
        instance = serializer.save()

class CustomerDestroyAPIView(
    StaffEditorPermissionMixin,
    generics.DestroyAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    lookup_field = 'pk'

    def perform_destroy(self, instance):
        super().perform_destroy(instance)

class CustomerMixinView(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    generics.GenericAPIView
    ):
    queryset= Customer.objects.all()
    serializer_class = CustomerSerializer
    def get(self, request, *args, **kwargs):
        print(args,kwargs)
        pk= kwargs.get("pk")
        if pk is not None:
            return self.retrieve(request, *args, **kwargs)
        return self.list(request, *args, **kwargs)
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)



@api_view(["GET","POST"])
def customer_alt_view(request, pk=None, *args, **kwargs):
    method = request.method

    if method == "GET":
        if pk is not None:
            #detail view
            obj = get_object_or_404(Customer, pk=pk)
            data = CustomerSerializer(obj, many=False).data 
            return Response(data)
        #list view
        queryset=Customer.objects.all()
        data = CustomerSerializer(queryset, many=True).data
        return Response(data)
    if method == "POST":
        serializer= CustomerSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            print(serializer.data)
            return Response(serializer.data)
        return Response({"invalid":"not good data"}, status=400)
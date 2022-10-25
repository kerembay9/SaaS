import email
from urllib import request
from rest_framework import serializers
from rest_framework.reverse import reverse
from .models import Customer

class CustomerSerializer(serializers.ModelSerializer):
    edit_url=serializers.SerializerMethodField(read_only=True)
    url= serializers.HyperlinkedIdentityField(
        view_name='customer-detail',
        lookup_field="pk"
    )
    email = serializers.EmailField(write_only=True)
    class Meta:
        model= Customer
        fields = [
            'url',
            'edit_url',
            'email',
            'pk',
            'id',
            'name',
            'surname', 
            'total_revenue',
            'sale_price',
        ]
    # def create(self, validated_data):
    #     email = validated_data.pop('email')
    #     obj =  super().create(validated_data)
    #     print(email,obj)
    #     return obj
 
    def get_edit_url (self, obj):
        #return f"/api/customers/{obj.pk}/"
         request = self.context.get('request')
         if request is None:
             return None
         return reverse("customer-edit", kwargs={"pk":obj.pk},request=request)
  
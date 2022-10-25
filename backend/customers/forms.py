from rest_framework import serializers
from .models import Customer

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model= Customer
        fields = [
            'id',
            'name',
            'surname', 
            'total_revenue',
            'sale_price',
        ]

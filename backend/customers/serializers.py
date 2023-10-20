from rest_framework import serializers
from .models import Customer, ClickingInstance


class ClickingInstanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClickingInstance
        fields = '__all__'

class ClickingInstanceCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClickingInstance
        fields = '__all__'

class CustomerSerializer(serializers.ModelSerializer):
    clicking_instances = ClickingInstanceSerializer(many=True, read_only=True)
    bmi = serializers.ReadOnlyField()
    bmi_category = serializers.ReadOnlyField()
    class Meta:
        model = Customer
        fields = '__all__'

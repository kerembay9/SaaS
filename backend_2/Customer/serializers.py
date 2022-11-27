from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Customer

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model= Customer
        fields=[
            'name',
            'surname',
            'phone',
            'company_name',
            'industry',
            'email',
            'created_on',
            'id',
        ]
        
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']
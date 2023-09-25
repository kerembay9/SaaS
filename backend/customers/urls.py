from django.urls import path
from .views import CustomerListCreateView, CustomerDetailView, bulk_delete_customers

urlpatterns = [
    path('', CustomerListCreateView.as_view(), name='customer-list-create'),
    path('<int:pk>/', CustomerDetailView.as_view(), name='customer-detail'),
    path('bulk-delete-customers/', bulk_delete_customers, name='bulk-delete-customers'),

]

from django.urls import path
from .views import CustomerListCreateView, CustomerDetailView, bulk_delete_customers, ClickingInstanceViewSet

urlpatterns = [
    path('', CustomerListCreateView.as_view(), name='customer-list-create'),
    path('<int:pk>/', CustomerDetailView.as_view(), name='customer-detail'),
    path('bulk-delete-customers/', bulk_delete_customers, name='bulk-delete-customers'),
    path('click-instance/', ClickingInstanceViewSet.as_view({'post': 'create', 'get': 'list'}), name='click-instance'),
    path('<int:pk>/click-instance/', ClickingInstanceViewSet.as_view({'get': 'list'}), name='click-instance'),


]

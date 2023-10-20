from django.urls import path
from .views import CustomerListCreateView, CustomerDetailView, bulk_delete_customers, ClickingInstanceDetailUpdateViewSet, ClickingInstanceListCreateViewSet

urlpatterns = [
    path('', CustomerListCreateView.as_view(), name='customer-list-create'),
    path('<int:pk>/', CustomerDetailView.as_view(), name='customer-detail'),
    path('bulk-delete-customers/', bulk_delete_customers, name='bulk-delete-customers'),
    path('click-instance/', ClickingInstanceListCreateViewSet.as_view({'post': 'create', 'get': 'list'}), name='click-instance'),
    path('<int:customerpk>/click-instance/<int:pk>/', ClickingInstanceDetailUpdateViewSet.as_view({'get': 'list','delete': 'destroy', 'put':'update'}), name='click-instance-detail'),
    path('<int:customerpk>/click-instance/', ClickingInstanceListCreateViewSet.as_view({'get': 'list'}), name='click-instance'),


]

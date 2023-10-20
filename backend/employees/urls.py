from django.urls import path
from .views import EmployeeListCreateView, EmployeeDetailView, bulk_delete_employees

urlpatterns = [
    path('', EmployeeListCreateView.as_view(), name='employee-list-create'),
    path('<int:pk>/', EmployeeDetailView.as_view(), name='employee-detail'),
    path('bulk-delete-employees/', bulk_delete_employees, name='bulk-delete-employees'),

]

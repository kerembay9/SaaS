from django.urls import path
from .views import AccountingListCreateView, AccountingDetailView, bulk_delete_accountings

urlpatterns = [
    path('', AccountingListCreateView.as_view(), name='accounting-list-create'),
    path('<int:pk>/', AccountingDetailView.as_view(), name='accounting-detail'),
    path('bulk-delete-accountings/', bulk_delete_accountings, name='bulk-delete-accountings'),

]

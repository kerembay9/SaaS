from django.urls import path
from . import views

urlpatterns = [
    path('', views.CustomerListCreateAPIView.as_view(),name="customer-list"),
    path('<int:pk>/update/', views.CustomerUpdateAPIView.as_view(), name="customer-edit"),
    path('<int:pk>/delete/', views.CustomerDestroyAPIView.as_view()),
    path('<int:pk>/', views.CustomerDetailAPIView.as_view(), name="customer-detail"),
]

from django.contrib import admin
from django.urls import path
from django.urls import include, path
from rest_framework import routers
from Customer import views
from Employees import views as employeeviews

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'customers', views.CustomerViewSet)
router.register(r'employees', employeeviews.EmployeeViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('admin/', admin.site.urls),
]

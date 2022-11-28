from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from Customer import views
from Employees import views as employeeviews

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)

urlpatterns = [
    path('customers/',  views.CustomerView.as_view()),
    path('customers/<int:pk>/',  views.CustomerUpdateDeleteView.as_view()),
    path('employees/',  employeeviews.EmployeeView.as_view()),
    path('employees/<int:pk>/',  employeeviews.EmployeeUpdateDeleteView.as_view()),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('admin/', admin.site.urls),
]

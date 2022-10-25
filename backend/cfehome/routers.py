from rest_framework.routers import DefaultRouter
from customers.viewsets import CustomerViewSet

router = DefaultRouter()
router.register('customers-abc', CustomerViewSet, basename='customers')

urlpatterns= router.urls

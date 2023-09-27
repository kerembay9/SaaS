from django.urls import path
from .views import CalendarEventListCreateView, CalendarEventDetailView, bulk_delete_calendarevents

urlpatterns = [
    path('', CalendarEventListCreateView.as_view(), name='calendarevent-list-create'),
    path('<int:pk>/', CalendarEventDetailView.as_view(), name='calendarevent-detail'),
    path('bulk-delete-calendarevents/', bulk_delete_calendarevents, name='bulk-delete-calendarevents'),

]

from django.urls import path
from .views import KanbanListCreateView, KanbanDetailView

urlpatterns = [
    path('', KanbanListCreateView.as_view(), name='kanban-list-create'),
    path('<int:pk>/', KanbanDetailView.as_view(), name='kanban-detail'),

]

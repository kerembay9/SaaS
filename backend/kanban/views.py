from rest_framework import generics, status
from rest_framework.response import Response
from .models import Kanban
from .serializers import KanbanSerializer

class KanbanListCreateView(generics.ListCreateAPIView):
    queryset = Kanban.objects.all()
    serializer_class = KanbanSerializer

class KanbanDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Kanban.objects.all()
    serializer_class = KanbanSerializer
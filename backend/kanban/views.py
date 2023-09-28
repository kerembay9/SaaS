from rest_framework import generics, status
from rest_framework.response import Response
from .models import Kanban
from .serializers import KanbanSerializer
from rest_framework.decorators import api_view

class KanbanListCreateView(generics.ListCreateAPIView):
    queryset = Kanban.objects.all()
    serializer_class = KanbanSerializer

class KanbanDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Kanban.objects.all()
    serializer_class = KanbanSerializer
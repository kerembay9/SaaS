from rest_framework import generics, status
from rest_framework.response import Response
from .models import CalendarEvent
from .serializers import CalendarEventSerializer
from rest_framework.decorators import api_view

class CalendarEventListCreateView(generics.ListCreateAPIView):
    queryset = CalendarEvent.objects.all()
    serializer_class = CalendarEventSerializer

class CalendarEventDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CalendarEvent.objects.all()
    serializer_class = CalendarEventSerializer

@api_view(['POST'])
def bulk_delete_calendarevents(request):
    calendarevent_ids = request.data.get('calendarevent_ids', [])
    print(calendarevent_ids, 'are the ids')
    
    # You can add additional authorization and validation checks here.
    
    # Delete the selected calendarevents
    deleted_count = CalendarEvent.objects.filter(id__in=calendarevent_ids).delete()
    
    return Response({'message': f'{deleted_count[0]} calendar events deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
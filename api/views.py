from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Note
from .serializers import NoteSerializer

# Create your views here.

@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/cars/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of carpoolers'
        },
        {
            'Endpoint': '/cars/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single carpooler object'
        },
        {
            'Endpoint': '/cars/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new carpooler with data sent in post request'
        },
        {
            'Endpoint': '/cars/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing carpooler with data sent in post request'
        },
        {
            'Endpoint': '/cars/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting carpooler'
        },
    ]

    return Response(routes)

@api_view(['GET'])
def getNotes(request):
    notes = Note.objects.all().order_by('-updated')
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getNote(request, pk):
    note = Note.objects.get(id=pk)
    serializer = NoteSerializer(note, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def createNote(request):
    data = request.data
    note = Note.objects.create(
        body=data['body']
    )
    serializer = NoteSerializer(note, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
def updateNote(request, pk):
    data = request.data
    note = Note.objects.get(id=pk)
    serializer = NoteSerializer(instance=note, data=data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['DELETE'])
def deleteNote(request, pk):
    note = Note.objects.get(id=pk)
    note.delete()
    return Response('Note was deleted')
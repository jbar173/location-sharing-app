from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics
from .models import (User, Location)
from .serializers import (UserSerializer, LocationSerializer)


# Create your views here.

@api_view(['GET',])
def apiOverview(request):
    api_urls = {
        'List of Users' : '/user-list/',
        'List of Locations' : '/location-list/',
        'User Detail' : '/user-detail/(?P<id>\d+)/',
        'Location Detail' : '/location-detail/(?P<id>\d+)/',

        'Create User' : '/create-user/',
        'Create Location' : '/create-location/',
        'Update User': '/update-user/(?P<id>\d+)/',
    }
    return Response(api_urls)


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class LocationList(generics.ListAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

class CreateLocation(generics.CreateAPIView):
    serializer_class = LocationSerializer

class CreateUser(generics.CreateAPIView):
    serializer_class = UserSerializer

@api_view(['GET',])
def userDetail(request,id):
    user = User.objects.get(pk=id)
    serializer = UserSerializer(user,many=False)
    return Response(serializer.data)

@api_view(['GET',])
def locationDetail(request,id):
    location = Location.objects.get(pk=id)
    serializer = LocationSerializer(location,many=False)
    return Response(serializer.data)

@api_view(['PUT',])
def updateUser(request,id):
    user = User.objects.get(id=id)
    x = request.data
    serializer = UserSerializer(instance=user,data=x)

    if serializer.is_valid():
        serializer.save()
    else:
        print("update user not valid")
        print(serializer.errors)

    return Response(serializer.data)

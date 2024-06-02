from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, status
from .serializers import UserSerializer, PostSerializer
from .models import User, Post, Comment
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.

class UserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class PostView(APIView):
    # TODO: TEMPORARY; WILL BE FIXED!
    serializer_class = PostSerializer


    def post(self, request, format = None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            title = serializer.data.title
        pass

# def main(request):
#     return HttpResponse("Hello")

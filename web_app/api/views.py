from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, status
from .serializers import UserSerializer, PostSerializer
from .models import User, Post, Comment
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages

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

def login_user(request):
    username = request.POST.get("username")
    password = request.POST.get("password")
    user = authenticate(request, username = username, password = password)
    if user is not None:
        login(request, user)
        return redirect("/home")
    else:
        # TODO: SHOW AN INVALID LOGIN PAGE
        messages.success(request, ("Invalid credentials.")) # TODO: DOES NOT DO ANYTHING ATM!
        return redirect("/sign-in")

# def main(request):
#     return HttpResponse("Hello")

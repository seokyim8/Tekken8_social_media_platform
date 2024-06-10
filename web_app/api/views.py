from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, status
from .models import Post
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib import messages
from django.http import JsonResponse


# Create your views here.

def create_user(request, format=None): 
    if len(User.objects.filter(username=request.POST["username"])) > 0:
        return redirect("/sign-in") # dupliacte username already exists

    post_info = request.POST

    user = User.objects.create_user(username=post_info["username"], password=post_info["password"], first_name=post_info["first_name"], last_name=post_info["last_name"])
    user.save()

    return redirect("/sign-in")

def display_user_info(request, format=None): 
    if request.user.is_authenticated:
        # fetching username info and appending it to the url as a query parameter in case it isn't done already
        if request.GET.get("username"): 
            user_list = User.objects.filter(username=request.GET.get("username"))
            for user in user_list:
                data = {
                    "username": user.username,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    # TODO: ADD MORE FIELDS LATER ON
                }
                return JsonResponse(data=data)
        else:
            return redirect(request.path_info + "?username=" + request.user.username)
    else:
        return redirect("/sign-in")

def display_all_users(request, format=None):
    if request.user.is_authenticated:
        # fetching username info and appending it to the url as a query parameter in case it isn't done already
        if request.GET.get("username"): 
            user_list = User.objects.all()
            data = {
                "user_list": [],
            }

            for user in user_list:
                temp = {
                    "user_name": user.username,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "last_login": user.last_login,
                }
                data["user_list"].append(temp)

            print(data["user_list"])
            return JsonResponse(data=data)
        else:
            return redirect(request.path_info + "?username=" + request.user.username)
    else:
        return redirect("/sign-in")

def create_post(request, format=None):
    if request.user.is_authenticated:
        # fetching username info and appending it to the url as a query parameter in case it isn't done already
        user = User.objects.get(username=request.user.username)
        data = request.POST
        post_tbc = Post(title=data.get("title"), body=data.get("body"), author=user, image=request.FILES.get("dropzone-file"))

        post_tbc.save()
        return redirect("/home")
    else:
        return redirect("/sign-in")

def get_all_posts(request, format=None):
    if request.user.is_authenticated:
        # fetching username info and appending it to the url as a query parameter in case it isn't done already
        if request.GET.get("username"): 
            post_list = Post.objects.all()
            data = {
                "post_list": [],
            }

            for post in post_list:
                temp = {
                    "title": post.title,
                    "body": post.body,
                    "author": post.author.username,
                    "date_created": post.date_created,
                    "likes": post.likes,
                    "post_id": post.post_id,
                    "image_src": str(post.image)
                }
                data["post_list"].append(temp)

            return JsonResponse(data=data)
        else:
            return redirect(request.path_info + "?username=" + request.user.username)
    else:
        return redirect("/sign-in")

def get_image(request, format=None):
    print("WHAT")
    return JsonResponse(data={})


def login_user(request):
    username = request.POST.get("username")
    password = request.POST.get("password")
    user = authenticate(request, username = username, password = password)
    if user is not None:
        login(request, user)
        return redirect("/home?username=" + username)
    else:
        # TODO: SHOW AN INVALID LOGIN PAGE
        messages.success(request, ("Invalid credentials.")) # TODO: DOES NOT DO ANYTHING ATM!
        return redirect("/sign-in")
    
def logout_user(request):
    logout(request)
    return redirect("/sign-in")

# def main(request):
#     return HttpResponse("Hello")

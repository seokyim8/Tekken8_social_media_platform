from django.shortcuts import render
from django.shortcuts import render, redirect


# Create your views here.
def index(request, *args, **kwargs):
    return render(request, 'frontend/index.html')

def home(request, *args, **kwargs):
    if request.user.is_authenticated: # WAS KEY!!!!!!
        return render(request, "frontend/index.html")
    else:
        return redirect("/sign-in")
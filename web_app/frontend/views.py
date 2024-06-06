from django.shortcuts import render
from django.shortcuts import render, redirect


# Create your views here.
def index(request, *args, **kwargs):
    # For signing in or up:
    if request.path_info == "/sign-in" or request.path_info == "/sign-up":
        return render(request, "frontend/index.html")


    # For other requests:
    if request.user.is_authenticated: # WAS KEY!!!!!!
        if request.GET.get("username"):
            return render(request, "frontend/index.html")
        else:
            return redirect(request.path_info + "?username=" + request.user.username)
    else:
        return redirect("/sign-in")

def nothing(request, *args, **kwargs):
    return redirect("/home/") # TODO: PRESERVE PARAMETERS?

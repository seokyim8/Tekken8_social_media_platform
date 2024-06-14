from django.shortcuts import render
from django.shortcuts import render, redirect
from django.views.decorators.csrf import ensure_csrf_cookie



# Create your views here.
@ensure_csrf_cookie
def index(request, *args, **kwargs):
    # For signing in or up:
    if request.path_info == "/sign-in" or request.path_info == "/sign-up":
        return render(request, "frontend/index.html")

    # For other requests:
    if request.user.is_authenticated: # WAS KEY!!!!!!
        if request.GET.get("username"):
            return render(request, "frontend/index.html")
        else:
            query_exists = False
            for letter in request.get_full_path():
                if letter == "?":
                    query_exists = True
                    break

            redirected_path = request.get_full_path()
            if query_exists:
                redirected_path += "&username=" + request.user.username
            else:
                redirected_path += "?username=" + request.user.username
            
            return redirect(redirected_path)
            
    else:
        return redirect("/sign-in")

@ensure_csrf_cookie
def nothing(request, *args, **kwargs):
    return redirect("/home/")

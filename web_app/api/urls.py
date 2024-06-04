from django.urls import path
from .views import login_user, logout_user

urlpatterns = [
    path('login', login_user),
    path('logout', logout_user),
]

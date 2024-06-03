from django.urls import path
from .views import index, home

urlpatterns = [
    path('', index),
    path('home', home),
    path('sign-in', index),
    path('sign-up',index),
]

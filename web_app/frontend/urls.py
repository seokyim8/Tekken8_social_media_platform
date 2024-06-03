from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('home', index),
    path('sign-in', index),
    path('sign-up',index),
]

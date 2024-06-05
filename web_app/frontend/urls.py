from django.urls import path
from .views import index, home

urlpatterns = [
    path('', home),
    path('home', home), # TODO: TO CHANGE
    path('sign-in', index),
    path('sign-up',index),
    path('explore', index),
    path('users', index),
    path('create-post', index),
    path('edit-post', index),
    path('posts', index),
    path('profile', index),
    path('saved', index),
]

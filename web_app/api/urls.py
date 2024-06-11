from django.urls import path
from .views import login_user, logout_user, create_user, display_user_info, display_all_users, create_post, get_all_posts, get_image, get_user_posts

urlpatterns = [
    path('login', login_user),
    path('logout', logout_user),
    # path('get_user_info', UserView.as_view()),
    path('create_user', create_user),
    path('get_user_info', display_user_info),
    path('get_all_users', display_all_users),
    path('create_post', create_post),
    path('get_all_posts', get_all_posts),
    path('get_user_posts', get_user_posts),
    path('images/', get_image),
]

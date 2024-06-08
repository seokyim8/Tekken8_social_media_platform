from django.urls import path
from .views import login_user, logout_user, create_user, display_user_info

urlpatterns = [
    path('login', login_user),
    path('logout', logout_user),
    # path('get_user_info', UserView.as_view()),
    path('create_user', create_user),
    path('get_user_info', display_user_info),
]

from django.urls import path
from .views import login_user, logout_user, CreateUserView

urlpatterns = [
    path('login', login_user),
    path('logout', logout_user),
    # path('get_user_info', UserView.as_view()),
    path('create_user', CreateUserView.as_view()),
]

from django.urls import path
from .views import SignupAPI, LoginAPI, UserProfileAPI, ProfileViewAPI, LogoutAPI

urlpatterns = [
    path("signup/", SignupAPI.as_view(), name= "signup"),
    path("login/", LoginAPI.as_view(), name= "login"),
    path("profile/", UserProfileAPI.as_view(), name= "profile"),
    path("me/", ProfileViewAPI.as_view(), name="me"),
    path("logout/", LogoutAPI.as_view(), name= "logout")
]
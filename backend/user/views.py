from rest_framework import views, response, exceptions, permissions, status
from .serializers import UserSerializer, UserProfileSerializer
from . import services
from .models import UserProfile
from . import authentication

# Signup API
class SignupAPI(views.APIView):
    def post(self, request):
        serializer = UserSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        serializer.instance = services.create_user(user_dc = data)

        return response.Response(data = serializer.data)

# Login
class LoginAPI(views.APIView):
    def post(self, request):
        email = request.data["email"]
        password = request.data["password"]
        user = services.user_selector(email=email)

        if user is None:
            raise exceptions.AuthenticationFailed("Invalid email or password")
        if not user.check_password(raw_password=password):
            raise exceptions.AuthenticationFailed("Invalid email or password")
        
        token = services.create_token(user_id= user.id)
        resp = response.Response()
        resp.set_cookie(key= "jwt", value= token, httponly= True)
        
        return resp
    
class ProfileViewAPI(views.APIView):
    authentication_classes = (authentication.CustomUserAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)
    def get(self, request):
        user = request.user
        profile = UserProfile.objects.filter(email=user.email).first()
        serializer = UserProfileSerializer(profile)
        return response.Response(serializer.data)

# Logout
class LogoutAPI(views.APIView):
    authentication_classes = (authentication.CustomUserAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        resp = response.Response()
        resp.delete_cookie("jwt")
        resp.data = {"message": "So long farewell"}

        return resp
    
# User Profile
class UserProfileAPI(views.APIView):
    def post(self, request):
        serializer = UserProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return response.Response(serializer.data, status=status.HTTP_201_CREATED)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

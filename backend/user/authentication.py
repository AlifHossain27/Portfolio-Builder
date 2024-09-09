from django.conf import settings
from rest_framework import authentication, exceptions
from rest_framework.exceptions import AuthenticationFailed, PermissionDenied
import jwt
from .models import User

class CustomUserAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed("Authentication credentials were not provided")
        try:
            payload = jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Token has expired")
        except jwt.InvalidTokenError:
            raise AuthenticationFailed("Invalid token")
        
        
        user = User.objects.filter(id=payload['id']).first()

        if not user:
            raise PermissionDenied("You are not authorized to access this resource")


        return (user, None)
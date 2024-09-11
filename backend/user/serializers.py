from rest_framework import serializers
from .services import UserDataClass
from .models import UserProfile

class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    email = serializers.CharField()
    password = serializers.CharField(write_only=True)


    def to_internal_value(self, data):
        data = super().to_internal_value(data)
        return UserDataClass(**data)
    
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['first_name', 'last_name', 'age', 'email', 'role', 'about_me', 'quote', 'skills', 'experience']

import uuid
from django.db import models
from django.contrib.auth import models as auth_models
from django.contrib.auth.hashers import make_password, check_password

    
class User(auth_models.AbstractUser):
    id = models.IntegerField(primary_key = True, unique=True)
    email = models.EmailField(max_length=255, unique=True, verbose_name= "Email")
    password = models.CharField(max_length=255, verbose_name= "Password")
    created_at = models.DateTimeField(auto_now_add=True)
    
    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)
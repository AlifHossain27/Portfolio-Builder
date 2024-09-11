from django.db import models
from django.contrib.auth import models as auth_models
from django.contrib.auth.hashers import make_password, check_password

class UserManager(auth_models.BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)
    
class User(auth_models.AbstractBaseUser):
    id = models.AutoField(primary_key = True, unique=True)
    email = models.EmailField(max_length=255, unique=True, verbose_name= "Email")
    password = models.CharField(max_length=255, verbose_name= "Password")
    created_at = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)
    
class UserProfile(models.Model):
    id = models.AutoField(primary_key = True, unique = True)
    first_name = models.CharField(default="", max_length=255, verbose_name="First Name")
    last_name = models.CharField(default="", max_length=255, verbose_name="Last Name")
    age = models.IntegerField(null=True, verbose_name="Age")
    email = models.CharField(default="", max_length=255, verbose_name="Email")
    role = models.CharField(default="", max_length=255, verbose_name="Role")
    about_me = models.TextField(default="", verbose_name="About me")
    quote = models.CharField(default="", max_length=255, verbose_name="Quote")
    skills = models.TextField(default="[]", blank=True, verbose_name="Skills")
    experience = models.TextField(default="[]", blank=True, verbose_name="Experience")
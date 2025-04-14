from django.urls import path
from .views import CreateUserProfile

urlpatterns = [
    path('', CreateUserProfile.as_view(), name='profile'),
]

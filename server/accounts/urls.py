from django.urls import path
from .views import SignupView,UserDetailView,UserListView

urlpatterns = [
    path('signup/', SignupView),
    path('user/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
    path('users/', UserListView.as_view(), name='all-user-detail'),
]
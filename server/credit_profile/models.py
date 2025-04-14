from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    full_name = models.CharField(max_length=255)
    dob = models.DateField()
    employment_status = models.CharField(max_length=100)
    monthly_income = models.DecimalField(max_digits=10, decimal_places=2)
    credit_score = models.PositiveIntegerField(default=300)

    def __str__(self):
        return self.full_name

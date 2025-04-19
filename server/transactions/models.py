from django.db import models

from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.
class Transaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    type = models.CharField(max_length=10, choices=[('credit', 'Credit'), ('debit', 'Debit')])
    description = models.TextField(blank=True, null=True)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.name} - {self.type} - {self.amount}"


class CreditScoreHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.IntegerField()
    credit_utilization = models.FloatField(default=0.0)  # <-- added field for credit utilization
    dti = models.FloatField(default=0.0)  # <-- added field for DTI (Debt-to-Income ratio)
    date = models.DateTimeField(auto_now_add=True)  # <-- captures both date & time

    def __str__(self):
        return f"{self.user.username} | Score: {self.score} | Util: {self.credit_utilization:.2f} | DTI: {self.dti:.2f} | At: {self.timestamp}"
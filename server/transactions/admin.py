from django.contrib import admin
from .models import Transaction,CreditScoreHistory
# Register your models here.

admin.site.register(Transaction)
admin.site.register(CreditScoreHistory)


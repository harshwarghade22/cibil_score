from .models import Transaction,CreditScoreHistory
from rest_framework import serializers

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'
        read_only_fields = ['user']

class CreditScoreHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CreditScoreHistory
        fields = '__all__'

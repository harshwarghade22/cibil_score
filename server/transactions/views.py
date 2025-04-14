from django.shortcuts import render
from .serializers import TransactionSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from credit_profile.models import UserProfile
from rest_framework.generics import ListAPIView
from .models import Transaction


# Create your views here.
class TransactionCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)

            # Update credit score
            profile = UserProfile.objects.get(user=request.user)
            transactions = Transaction.objects.filter(user=request.user)

            balance = sum(t.amount for t in transactions if t.type == 'credit') - \
                    sum(t.amount for t in transactions if t.type == 'debit')
            profile.credit_score = 300 + min(balance // 1000, 550)
            profile.save()

            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)




class TransactionListView(ListAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user).order_by('-date')


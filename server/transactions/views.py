# from django.shortcuts import render
# from .serializers import TransactionSerializer,CreditScoreHistorySerializer
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated
# from credit_profile.models import UserProfile
# from rest_framework.generics import ListAPIView
# from .models import Transaction,CreditScoreHistory
from datetime import date, timedelta
from decimal import Decimal
from django.shortcuts import render
from .serializers import TransactionSerializer,CreditScoreHistorySerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from credit_profile.models import UserProfile
from rest_framework.generics import ListAPIView
from .models import Transaction,CreditScoreHistory


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

            CreditScoreHistory.objects.create(user=request.user, score=profile.credit_score)

            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)




# class TransactionListView(ListAPIView):
#     serializer_class = TransactionSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         return Transaction.objects.filter(user=self.request.user).order_by('-date')





# class TransactionCreateView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         serializer = TransactionSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save(user=request.user)

#             profile = UserProfile.objects.get(user=request.user)
#             transactions = Transaction.objects.filter(user=request.user)

#             # --- Feature Calculations ---
#             total_credit = sum(t.amount for t in transactions if t.type == 'credit')
#             total_debit = sum(t.amount for t in transactions if t.type == 'debit')
#             total_tx = transactions.count()

#             one_month_ago = date.today() - timedelta(days=30)
#             monthly_credit = sum(t.amount for t in transactions if t.type == 'credit' and t.date >= one_month_ago)
#             monthly_debit = sum(t.amount for t in transactions if t.type == 'debit' and t.date >= one_month_ago)

#             credit_util = float(monthly_credit / profile.credit_limit) if profile.credit_limit else 0
#             avg_tx_value = float((total_credit + total_debit) / total_tx) if total_tx else 0
#             credit_age_months = (date.today() - profile.created_at).days // 30
#             high_value_tx_count = sum(1 for t in transactions if t.amount > 10000 and t.date >= one_month_ago)
#             dti = float(monthly_debit / profile.monthly_income) if profile.monthly_income else 0

#             # --- Credit Score Heuristic ---
#             score = 300

#             # Credit history age
#             score += min(credit_age_months * 2, 100)

#             # Credit utilization (ideal < 30%)
#             if credit_util < 0.3:
#                 score += 100
#             elif credit_util < 0.5:
#                 score += 50
#             else:
#                 score -= 50

#             # DTI
#             if dti < 0.3:
#                 score += 100
#             elif dti < 0.6:
#                 score += 50
#             else:
#                 score -= 50

#             # Penalize excessive debits
#             if monthly_debit > monthly_credit:
#                 score -= 50

#             # Normalize score
#             score = max(250, min(score, 850))
#             profile.credit_score = int(score)
#             print("Credit Age Months:", credit_age_months)
#             print("Credit Utilization:", credit_util)
#             print("DTI:", dti)
#             print("Final Score:", score)

            

#             profile.save()

#             # Create Credit Score History record
#             CreditScoreHistory.objects.create(user=request.user, score=score)

#             return Response(serializer.data, status=201)
#         return Response(serializer.errors, status=400)


class TransactionListView(ListAPIView):
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user).order_by('-date')


class CreditScoreHistoryListView(ListAPIView):
    serializer_class = CreditScoreHistorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return CreditScoreHistory.objects.filter(user=self.request.user).order_by('-date')

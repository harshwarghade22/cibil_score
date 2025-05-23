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
import joblib
import os
from django.conf import settings
import numpy as np
from rest_framework.decorators import api_view



# --- Load ML Model and Predict Recommendation ---
model_path = os.path.join(os.path.dirname(__file__), 'recommendation_model.pkl')
model = joblib.load(model_path)

model_path1 = os.path.join(os.path.dirname(__file__), 'predict_credit_model.pkl')
model1 = joblib.load(model_path1)





# Create your views here.
# class TransactionCreateView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         serializer = TransactionSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save(user=request.user)

#             # Update credit score
#             profile = UserProfile.objects.get(user=request.user)
#             transactions = Transaction.objects.filter(user=request.user)

#             balance = sum(t.amount for t in transactions if t.type == 'credit') - \
#                     sum(t.amount for t in transactions if t.type == 'debit')
#             profile.credit_score = 300 + min(balance // 1000, 550)
#             profile.save()

#             CreditScoreHistory.objects.create(user=request.user, score=profile.credit_score)

#             return Response(serializer.data, status=201)
#         return Response(serializer.errors, status=400)










class TransactionCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)

            profile = UserProfile.objects.get(user=request.user)
            transactions = Transaction.objects.filter(user=request.user)

            total_credit = sum(t.amount for t in transactions if t.type == 'credit')
            total_debit = sum(t.amount for t in transactions if t.type == 'debit')
            total_tx = transactions.count()

            one_month_ago = date.today() - timedelta(days=30)
            monthly_credit = sum(t.amount for t in transactions if t.type == 'credit' and t.date >= one_month_ago)
            monthly_debit = sum(t.amount for t in transactions if t.type == 'debit' and t.date >= one_month_ago)

            credit_util = float(monthly_credit / profile.credit_limit) if profile.credit_limit else 0
            avg_tx_value = float((total_credit + total_debit) / total_tx) if total_tx else 0
            credit_age_months = (date.today() - profile.created_at).days // 30
            high_value_tx_count = sum(1 for t in transactions if t.amount > 10000 and t.date >= one_month_ago)
            dti = float(monthly_debit / profile.monthly_income) if profile.monthly_income else 0

            # --- Credit Score Calculation ---
            score = 300
            score += min(credit_age_months * 2, 100)

            if credit_util < 0.3:
                score += 100
            elif credit_util < 0.5:
                score += 50
            else:
                score -= 50

            if dti < 0.3:
                score += 100
            elif dti < 0.6:
                score += 50
            else:
                score -= 50

            if monthly_debit > monthly_credit:
                score -= 50

            score = max(250, min(score, 850))
            balance = sum(t.amount for t in transactions if t.type == 'credit') - \
                    sum(t.amount for t in transactions if t.type == 'debit')
            profile.credit_score = 300 + min(balance // 1000, 550)
            profile.save()

            CreditScoreHistory.objects.create(
                user=request.user,
                score=profile.credit_score,
                credit_utilization=credit_util,
                dti=dti,
            )


            # --- Load ML Model and Predict Recommendation ---
            model_path = os.path.join(os.path.dirname(__file__), 'recommendation_model.pkl')
            model = joblib.load(model_path)
            input_features = [[profile.credit_score, credit_util, dti]]
            recommendation = model.predict(input_features)[0]
            print("🔍 Input Features:", input_features)
            print("🔁 ML Recommendation:", recommendation)

            return Response({
                'transaction': serializer.data,
                'credit_score': profile.credit_score,
                'credit_utilization': credit_util,
                'dti': dti,
                'recommendation': recommendation
            }, status=201)
            
        return Response(serializer.errors, status=400)
    
class MLRecommendationOnlyView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        credit_score = request.data.get('credit_score')
        credit_utilization = request.data.get('credit_utilization')
        dti = request.data.get('dti')

        if not all([credit_score, credit_utilization, dti]):
            return Response({'error': 'Missing input parameters'}, status=400)

        
        
        input_features = [[credit_score, credit_utilization, dti]]
        recommendation = model.predict(input_features)[0]

        return Response({'recommendation': recommendation}, status=200)


@api_view(['POST'])
def get_credit_recommendation(request):
    try:
        score = request.data.get('score')
        credit_util = request.data.get('credit_util')
        dti = request.data.get('dti')

        if None in (score, credit_util, dti):
            return Response({'error': 'Missing input fields'}, status=400)

        input_features = np.array([[score, credit_util, dti]])
        prediction = model.predict(input_features)

        return Response({'recommendation': prediction[0]})
    
    except Exception as e:
        return Response({'error': str(e)}, status=500)
    

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

from rest_framework.decorators import api_view, permission_classes

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def predict_future_score(request):
    try:
        data = request.data
        credit_utilization = float(data['credit_utilization'])
        dti = float(data['dti'])

        prediction = model1.predict([[credit_utilization, dti]])
        return Response({'predicted_score': round(prediction[0], 2)})
    except Exception as e:
        return Response({'error': str(e)}, status=400)

from django.urls import path
from .views import TransactionListView, TransactionCreateView,CreditScoreHistoryListView,get_credit_recommendation,MLRecommendationOnlyView, predict_future_score

urlpatterns = [
    path('', TransactionListView.as_view(), name='transaction-list'),
    path('add/', TransactionCreateView.as_view(), name='add-transaction'),
    path('credit_score_history/', CreditScoreHistoryListView.as_view(), name='credit-score-history'),
    path('recommendation/', MLRecommendationOnlyView.as_view(), name='credit_recommendation'),
     path('predict-score/', predict_future_score),
]

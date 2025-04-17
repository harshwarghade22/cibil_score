from django.urls import path
from .views import TransactionListView, TransactionCreateView,CreditScoreHistoryListView

urlpatterns = [
    path('', TransactionListView.as_view(), name='transaction-list'),
    path('add/', TransactionCreateView.as_view(), name='add-transaction'),
    path('credit_score_history/', CreditScoreHistoryListView.as_view(), name='credit-score-history'),
]

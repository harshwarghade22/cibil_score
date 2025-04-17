# credit_recommendation_model.py
import pandas as pd
from sklearn.tree import DecisionTreeClassifier
import joblib

# Example dataset
data = pd.DataFrame({
    'score': [300, 550, 650, 720, 800],
    'credit_util': [80, 50, 30, 20, 10],
    'dti': [40, 30, 20, 15, 10],
    'recommendation': [
        'Reduce credit utilization below 30%',
        'Lower credit utilization and DTI',
        'Keep credit utilization under 30%',
        'Maintain current behavior',
        'Maintain excellent status'
    ]
})

X = data[['score', 'credit_util', 'dti']]
y = data['recommendation']

model = DecisionTreeClassifier()
model.fit(X, y)

joblib.dump(model, 'recommendation_model.pkl')

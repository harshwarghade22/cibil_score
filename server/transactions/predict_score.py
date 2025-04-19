# import pandas as pd
# from sklearn.ensemble import RandomForestRegressor
# import joblib
# from transactions.models import CreditScoreHistory
# from sklearn.model_selection import train_test_split
# from sklearn.metrics import mean_squared_error



# df = pd.DataFrame(list(CreditScoreHistory.objects.values(
#     'score', 'credit_utilization', 'dti'
# )))

# # Features: e.g., current score, utilization, dti
# X = df[['credit_utilization', 'dti']]
# y = df['score']  # Target: future credit score

# # Train/test split
# X_train, X_test, y_train, y_test = train_test_split(
#     X, y, test_size=0.2, random_state=42
# )

# # Model training
# model = RandomForestRegressor(n_estimators=100, random_state=42)
# model.fit(X_train, y_train)

# # Evaluate
# predictions = model.predict(X_test)
# mse = mean_squared_error(y_test, predictions)

# joblib.dump(model, 'predict_credit_model.pkl')
# print("Model saved!")




import pandas as pd
from sklearn.ensemble import RandomForestRegressor
import joblib
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
import numpy as np

# Dummy dataset generation
# Let's assume 100 samples of realistic credit utilization and dti with corresponding scores
np.random.seed(42)
df = pd.DataFrame({
    'credit_utilization': np.random.uniform(0, 1, 100),  # 0% to 100%
    'dti': np.random.uniform(0, 1, 100),  # 0 to 1 ratio
    'score': np.random.randint(300, 850, 100)  # typical credit scores
})

# Features
X = df[['credit_utilization', 'dti']]
y = df['score']  # Target: credit score

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Model training
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate
predictions = model.predict(X_test)
mse = mean_squared_error(y_test, predictions)

# Save the model
joblib.dump(model, 'predict_credit_model.pkl')
print(f"Model saved with MSE: {mse:.2f}")

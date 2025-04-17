import { combineReducers, createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import {
  creditScoreHistoryReducer,
  loginProjectReducers,
  profileCreateReducer,
  profileDetailsReducer,
  signupProjectReducers,
  transactionCreateReducer,
  transactionListReducer,
  userDetailReducers,
} from './reducers/projectReducers';

// ✅ 1. Get userInfo from localStorage
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

// ✅ 2. Combine all reducers
const rootReducer = combineReducers({
  userSignup: signupProjectReducers,
  userLogin: loginProjectReducers,
  userDetails: userDetailReducers,
  profileCreate: profileCreateReducer,
  profileDetails: profileDetailsReducer,
  transactionCreate: transactionCreateReducer,
  transactionList: transactionListReducer,
  creditScoreHistory: creditScoreHistoryReducer,
});

// ✅ 3. Preload the state with userInfo
const initialState = {
  userLogin: {
    userInfo: userInfoFromStorage,
    isAuthenticated: userInfoFromStorage ? true : false,
  },
};

const middleware = [thunk];

// ✅ 4. Create store with preloaded state
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

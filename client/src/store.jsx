import {combineReducers,createStore,applyMiddleware} from 'redux'
import {thunk} from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension';
import { loginProjectReducers,  profileCreateReducer,  profileDetailsReducer,  signupProjectReducers, transactionCreateReducer, transactionListReducer, userDetailReducers } from './reducers/projectReducers';




const rootReducer = combineReducers({
    userSignup:signupProjectReducers,
    userLogin :loginProjectReducers,
    userDetails:userDetailReducers,
    profileCreate:profileCreateReducer,
    profileDetails:profileDetailsReducer,
    transactionCreate:transactionCreateReducer,
    transactionList:transactionListReducer,
})



const middleware=[thunk]


const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)))

export default store;
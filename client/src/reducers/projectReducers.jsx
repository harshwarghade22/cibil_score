import { GET_USERDETAIL_FAIL, GET_USERDETAIL_REQUEST, GET_USERDETAIL_SUCCESS, LOGIN_PROJECT_FAIL, LOGIN_PROJECT_REQUEST, LOGIN_PROJECT_SUCCESS, LOGOUT_PROJECT, PROFILE_CREATE_FAIL, PROFILE_CREATE_REQUEST, PROFILE_CREATE_SUCCESS, PROFILE_DETAILS_FAIL, PROFILE_DETAILS_REQUEST, PROFILE_DETAILS_SUCCESS, SIGNUP_PROJECT_FAIL, SIGNUP_PROJECT_REQUEST, SIGNUP_PROJECT_SUCCESS, TRANSACTION_CREATE_FAIL, TRANSACTION_CREATE_REQUEST, TRANSACTION_CREATE_SUCCESS, TRANSACTION_LIST_FAIL, TRANSACTION_LIST_REQUEST, TRANSACTION_LIST_SUCCESS } from "../constants/projectConstants";

const initialState = {
    loading: false,
    userInfo: null,
    error: null,
    };
      
export const signupProjectReducers = (state = initialState, action) => {
switch (action.type) {
    case SIGNUP_PROJECT_REQUEST:
    return {
        ...state,
        loading: true,
    };
    case SIGNUP_PROJECT_SUCCESS:
    return {
        ...state,
        loading: false,
        userInfo: action.payload,
    };
    case SIGNUP_PROJECT_FAIL:
    return {
        ...state,
        loading: false,
        error: action.payload,
    };
    default:
    return state;
}
};

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState2 = {
  isAuthenticated: userInfoFromStorage ? true : false,
  userInfo: userInfoFromStorage,
};


export const loginProjectReducers = (state = initialState2, action) => {
  switch (action.type) {
    case LOGIN_PROJECT_REQUEST:
      return { loading: true, isAuthenticated: false };
    case LOGIN_PROJECT_SUCCESS:
      return {
        loading: false,
        isAuthenticated: true,
        userInfo: action.payload,
      };
    case LOGIN_PROJECT_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };
    case LOGOUT_PROJECT:
      return {
        isAuthenticated: false,
        userInfo: null,
      };
    default:
      return state;
  }
};


export const userDetailReducers = (state = {}, action) =>{
    switch(action.type){
        case GET_USERDETAIL_REQUEST:
            return {
                loading: true
            }
        case GET_USERDETAIL_SUCCESS:
            return {
                loading: false,
                user: action.payload
            }
        case GET_USERDETAIL_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const profileCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case PROFILE_CREATE_REQUEST:
        return { loading: true };
      case PROFILE_CREATE_SUCCESS:
        return { loading: false, profile: action.payload };
      case PROFILE_CREATE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const profileDetailsReducer = (state = { profile: {} }, action) => {
    switch (action.type) {
      case PROFILE_DETAILS_REQUEST:
        return { loading: true };
      case PROFILE_DETAILS_SUCCESS:
        return { loading: false, profile: action.payload };
      case PROFILE_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
};

export const transactionCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TRANSACTION_CREATE_REQUEST:
      return { loading: true };
    case TRANSACTION_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        transaction: action.payload.transaction,
        credit_score: action.payload.credit_score,
        credit_utilization: action.payload.credit_utilization,
        dti:action.payload.dti,
        recommendation: action.payload.recommendation,
        
      };
    case TRANSACTION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};



export const transactionListReducer = (state = { transactions: [] }, action) => {
  switch (action.type) {
    case TRANSACTION_LIST_REQUEST:
      return { loading: true, transactions: [] }
    case TRANSACTION_LIST_SUCCESS:
      return { loading: false, transactions: action.payload }
    case TRANSACTION_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

const initialState3 = {
  creditScoreHistory: [],
};

export const creditScoreHistoryReducer = (state = initialState3, action) => {
  switch (action.type) {
      case 'FETCH_CREDIT_SCORE_HISTORY':
          return {
              ...state,
              creditScoreHistory: action.payload,
          };
      default:
          return state;
  }
};
  
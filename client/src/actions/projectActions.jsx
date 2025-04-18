import axios from 'axios'
import { GET_USERDETAIL_FAIL, GET_USERDETAIL_REQUEST, GET_USERDETAIL_SUCCESS, LOGIN_PROJECT_FAIL, LOGIN_PROJECT_REQUEST, LOGIN_PROJECT_SUCCESS, LOGOUT_PROJECT, PROFILE_CREATE_FAIL, PROFILE_CREATE_REQUEST, PROFILE_CREATE_SUCCESS, PROFILE_DETAILS_FAIL, PROFILE_DETAILS_REQUEST, PROFILE_DETAILS_SUCCESS, SIGNUP_PROJECT_FAIL, SIGNUP_PROJECT_REQUEST, SIGNUP_PROJECT_SUCCESS, TRANSACTION_CREATE_FAIL, TRANSACTION_CREATE_REQUEST, TRANSACTION_CREATE_SUCCESS, TRANSACTION_LIST_FAIL, TRANSACTION_LIST_REQUEST, TRANSACTION_LIST_SUCCESS } from '../constants/projectConstants';

export const signup = (name, email, password, password2) => async (dispatch) => {
  try {
    dispatch({ type: SIGNUP_PROJECT_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const { data } = await axios.post('http://127.0.0.1:8000/api/accounts/signup/', { name, email, password, password2 }, config);

    dispatch({
      type: SIGNUP_PROJECT_SUCCESS,
      payload: data
    });

    // You may also want to save user info in local storage
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: SIGNUP_PROJECT_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};


export const loginProject = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_PROJECT_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://127.0.0.1:8000/api/token/",
      { email, password },
      config
    );

    dispatch({
      type: LOGIN_PROJECT_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: LOGIN_PROJECT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



export const logoutProject = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: LOGOUT_PROJECT });
};


export const getUserDetails = (token, userId) => async (dispatch) => {
  console.log(token)
  console.log(userId)
  try {
    dispatch({ type: GET_USERDETAIL_REQUEST });
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`http://127.0.0.1:8000/api/accounts/user/${userId}/`, config); // Adjust the endpoint accordingly
    // console.log(data)

    dispatch({
      type: GET_USERDETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USERDETAIL_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const createProfile = (profileData) => async (dispatch, getState) => {
  try {
    dispatch({ type: PROFILE_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('http://127.0.0.1:8000/api/credit_profile/', profileData, config);

    dispatch({ type: PROFILE_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PROFILE_CREATE_FAIL,
      payload: error.response?.data?.detail || error.message,
    });
  }
};

export const getProfile = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PROFILE_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: { Authorization: `Bearer ${userInfo.access}` },
    };

    const { data } = await axios.get('http://127.0.0.1:8000/api/credit_profile/', config);

    dispatch({ type: PROFILE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PROFILE_DETAILS_FAIL,
      payload: error.response?.data?.detail || error.message,
    });
  }
};

export const addTransaction = (transaction) => async (dispatch, getState) => {
  try {
    dispatch({ type: TRANSACTION_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.post('http://127.0.0.1:8000/api/transactions/add/', transaction, config);
    console.log(data)

    dispatch({ type: TRANSACTION_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TRANSACTION_CREATE_FAIL
      ,
      payload: error.response?.data?.detail || error.message,
    });
  }
};

export const listTransactions = () => async (dispatch, getState) => {
  try {
    dispatch({ type: TRANSACTION_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    }

    const { data } = await axios.get('http://127.0.0.1:8000/api/transactions/', config)
    console.log(data)

    dispatch({
      type: TRANSACTION_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: TRANSACTION_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    })
  }
}

export const fetchCreditScoreHistory = () => async (dispatch,getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.access}`,
      },
    }
    const response = await axios.get('http://127.0.0.1:8000/api/transactions/credit_score_history/',config);
    dispatch({
      type: 'FETCH_CREDIT_SCORE_HISTORY',
      payload: response.data,
    });
  } catch (error) {
    console.error('Error fetching credit score history', error);
  }
};




import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, userInfo } = useSelector(state => state.userLogin);// adjust according to your reducer

  return isAuthenticated ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;

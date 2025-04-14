import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import CreditProfile from './components/Profile/CreditProfile';
import ProfileScreen from './components/Profile/ProfileScreen';
import Add from './components/Transaction/Add';
import List from './components/Transaction/List';
import ProfileManagementPage from './components/Profile/ProfileManagementPage';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Routes */}
          <Route
            path="/profile_management"
            element={
              <ProtectedRoute>
                <ProfileManagementPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/credit_profile"
            element={
              <ProtectedRoute>
                <CreditProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/credit_profile/screen"
            element={
              <ProtectedRoute>
                <ProfileScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transaction/add"
            element={
              <ProtectedRoute>
                <Add />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transaction/list"
            element={
              <ProtectedRoute>
                <List />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

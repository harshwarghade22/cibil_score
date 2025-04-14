import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaUserMd, FaBars, FaTimes, FaHeartbeat, FaUserCircle } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { getUserDetails, logoutProject } from '../actions/projectActions';
// import { getUserDetails, logoutProject } from '../actions/projectAction';
// import { logoutProject } from '../reducers/projectReducer';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get authentication state from Redux
  const { isAuthenticated, userInfo } = useSelector(state => state.userLogin);
  console.log(userInfo)

  const { user } = useSelector((state) => state.userDetails);
  console.log(user)


  useEffect(() => {
    if (userInfo) {
      try {
        const token = userInfo.access;
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decodedPayload = JSON.parse(atob(base64));
        const userId = decodedPayload.user_id;
        console.log(userId)
        dispatch(getUserDetails(userInfo.access, userId));
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [dispatch, userInfo]);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logoutProject());
    navigate('/');
  };

  const AuthButton = () => {
    if (isAuthenticated) {
      return (
        <div className="flex items-center space-x-4">
          {/* <Link 
            to="/profile"
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition"
          >
            <FaUserCircle className="h-5 w-5" />
            <span className="font-medium">{user?.fullName || 'Profile'}</span>
          </Link> */}

          <h1>Hey {user?.name} !!</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-all duration-300"
          >
            Logout
          </button>
        </div>
      );
    }

    return (
      <div className="flex space-x-4">
        <Link
          to="/signin"
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          SignIn
        </Link>
        <Link
          to="/signup"
          className="border border-blue-600 text-blue-600 px-6 py-2 rounded-full hover:bg-blue-50 transition-all duration-300"
        >
          Sign Up
        </Link>
      </div>
    );
  };

  return (
    <nav className={`w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              {/* <FaHeartbeat className="h-8 w-8 text-red-500 group-hover:scale-110 transition-transform duration-300" /> */}
              <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CIBIL
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-medium" : "text-gray-600 hover:text-blue-600"
              }
            >
              Home
            </NavLink>
            
            {/* <NavLink 
              to="/doctors"
              className={({ isActive }) => 
                isActive ? "text-blue-600 font-medium" : "text-gray-600 hover:text-blue-600"
              }
            >
              Doctors
            </NavLink> */}

            

            <NavLink
              to="/credit_profile"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-medium" : "text-gray-600 hover:text-blue-600"
              }
            >
              Credit Profile
            </NavLink>

            {/* <NavLink
              to="/profile_management"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-medium" : "text-gray-600 hover:text-blue-600"
              }
            >
              Profile
            </NavLink> */}
            <NavLink
              to="/credit_profile/screen/"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-medium" : "text-gray-600 hover:text-blue-600"
              }
            >
              View Profile
            </NavLink>

            <NavLink
              to="/transaction/add"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-medium" : "text-gray-600 hover:text-blue-600"
              }
            >
              Add Transaction
            </NavLink>
            <NavLink
              to="/transaction/list"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-medium" : "text-gray-600 hover:text-blue-600"
              }
            >
              List Transactions
            </NavLink>

          </div>
          {/* Auth Button */}
          <div className="flex items-center">
            <AuthButton />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
            >
              {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute left-0 right-0 bg-white/90 backdrop-blur-md shadow-lg transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
        >
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-gray-600 hover:bg-blue-50 rounded-md"
            >
              Home
            </Link>
            <Link
              to="/emergency"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-gray-600 hover:bg-blue-50 rounded-md"
            >
              Emergency
            </Link>
            <Link
              to="/doctors"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-gray-600 hover:bg-blue-50 rounded-md"
            >
              Doctors
            </Link>
            <Link
              to="/pharmacy"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-gray-600 hover:bg-blue-50 rounded-md"
            >
              Pharmacy
            </Link>
            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 text-gray-600 hover:bg-blue-50 rounded-md"
            >
              About
            </Link>

            {isAuthenticated && (
              <>
                <Link
                  to="/wallet"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-gray-600 hover:bg-blue-50 rounded-md"
                >
                  Wallet
                </Link>
                <Link
                  to="/emergency-history"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-gray-600 hover:bg-blue-50 rounded-md"
                >
                  Emergency History
                </Link>
              </>
            )}

            {/* Mobile Auth Buttons */}
            <div className="space-y-2 pt-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-full"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full bg-red-500 text-white px-4 py-2 rounded-full"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center px-4 py-2 border border-blue-600 text-blue-600 rounded-full"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
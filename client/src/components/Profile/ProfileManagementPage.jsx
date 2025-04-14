import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../../actions/projectActions';
import ProfileScreen from './ProfileScreen';
import CreateProfile from './CreditProfile';
// import CreateProfile from './CreateProfile';
// import ProfileScreen from './ProfileScreen';

const ProfileManagementPage = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector(state => state.profileDetails);
  const { profile: newProfile } = useSelector(state => state.profileCreate);
  const [hasProfile, setHasProfile] = useState(false);
  const [activeTab, setActiveTab] = useState('view'); // 'view' or 'create'

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile && Object.keys(profile).length > 0) {
      setHasProfile(true);
    }
  }, [profile]);

  useEffect(() => {
    if (newProfile) {
      // If a new profile was created, switch to view tab
      setActiveTab('view');
      // Refresh profile data
      dispatch(getProfile());
    }
  }, [newProfile, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">Profile Management</h1>
          <p className="mt-2 text-lg text-gray-600">View and manage your financial profile information</p>
        </div>

        {/* Tab Navigation - Mobile */}
        <div className="sm:hidden mb-6">
          <select
            className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
          >
            <option value="view">View Profile</option>
            <option value="create">{hasProfile ? 'Update Profile' : 'Create Profile'}</option>
          </select>
        </div>

        {/* Tab Navigation - Desktop */}
        <div className="hidden sm:block mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('view')}
                className={`${
                  activeTab === 'view'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                aria-current={activeTab === 'view' ? 'page' : undefined}
              >
                View Profile
              </button>
              <button
                onClick={() => setActiveTab('create')}
                className={`${
                  activeTab === 'create'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                aria-current={activeTab === 'create' ? 'page' : undefined}
              >
                {hasProfile ? 'Update Profile' : 'Create Profile'}
              </button>
            </nav>
          </div>
        </div>

        {/* Content Based on Active Tab */}
        <div className="space-y-6">
          {activeTab === 'view' ? (
            <div className="transition-opacity duration-300">
              <ProfileScreen />
              {!hasProfile && (
                <div className="mt-6 text-center">
                  <p className="text-gray-600 mb-4">You haven't created your profile yet.</p>
                  <button
                    onClick={() => setActiveTab('create')}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Create Profile Now
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="transition-opacity duration-300">
              <CreateProfile />
              {hasProfile && (
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">Attention</h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>You already have a profile. Submitting this form will update your existing profile information.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileManagementPage;
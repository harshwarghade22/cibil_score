import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../../actions/projectActions';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { loading, error, profile } = useSelector(state => state.profileDetails);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatCurrency = (amount) => {
    if (!amount) return '₹0';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getCreditScoreColor = (score) => {
    if (!score) return 'bg-gray-100 text-gray-600';
    if (score >= 750) return 'bg-green-100 text-green-800';
    if (score >= 650) return 'bg-blue-100 text-blue-800';
    if (score >= 550) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getCreditScoreLabel = (score) => {
    if (!score) return 'Not Available';
    if (score >= 750) return 'Excellent';
    if (score >= 650) return 'Good';
    if (score >= 550) return 'Fair';
    return 'Poor';
  };

  if (loading) {
    return (
      <div className="max-w-xl mx-auto mt-6 p-8 bg-white shadow-lg rounded-lg flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-gray-200 h-16 w-16 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2.5"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="mt-4 text-gray-500">Loading profile data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto mt-6 p-6 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error Loading Profile</h3>
            <p className="mt-1 text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-20 w-20 rounded-full bg-white/20 flex items-center justify-center text-white text-3xl font-bold">
                {profile?.full_name ? profile.full_name.charAt(0).toUpperCase() : '?'}
              </div>
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-bold text-white">{profile?.full_name || 'User Profile'}</h2>
              <p className="text-blue-100 mt-1">Financial Profile</p>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="p-6">
          {!profile ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No profile information available.</p>
            </div>
          ) : (
            <>
              {/* Credit Score Card */}
              <div className="mb-8">
                <div className={`rounded-lg p-4 ${getCreditScoreColor(profile.credit_score)}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Credit Score</p>
                      <p className="text-3xl font-bold">{profile.credit_score || 'N/A'}</p>
                      <p className="text-sm mt-1">{getCreditScoreLabel(profile.credit_score)}</p>
                    </div>
                    <div className="h-16 w-16 rounded-full bg-white/30 flex items-center justify-center">
                      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Details */}
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="text-base font-medium">{profile.full_name || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date of Birth</p>
                      <p className="text-base font-medium">{formatDate(profile.dob)}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Financial Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Employment Status</p>
                      <p className="text-base font-medium capitalize">{profile.employment_status || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Monthly Income</p>
                      <p className="text-base font-medium">{formatCurrency(profile.monthly_income)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Last Updated */}
              <div className="mt-8 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  Profile last updated on {new Date().toLocaleDateString()}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
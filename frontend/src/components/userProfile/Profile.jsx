import React, { useContext, useEffect, useState } from 'react';
import ASidebar from '../../Admin_Panel/Shared/Asidebar';
import BSidebar from '../../Delivary_Boy/Shared/Bsidebar';
import Navbar from '../../Pages/Shared/Navbar';
import Sidebar from '../../Pages/Shared/Sidebar';
import apiClient from '../../axiosInstance';
import { AuthContext } from '../../contexts/AuthContext';
import UpdateProfile from './UpdateProfile';
const Profile = () => {
  const { user: loggedInUser, token } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null); // Initially null to represent loading state
  const [isEditing, setIsEditing] = useState(false);

  // Fetch logged-in user data from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (loggedInUser?.email) {
          const response = await apiClient.get(
            `/api/user/email/${loggedInUser.email}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setUserInfo(response.data); // Set user data
        }
      } catch (error) {
        console.error('Error fetching user', error);
      }
    };
    fetchUser();
  }, [loggedInUser, token]);

  if (!userInfo) return <div>Loading...</div>; // Simple loading state

  return (
    <>
      <Navbar />
      <div className="flex">
      {
        loggedInUser ? (
          <>
            {loggedInUser?.role === "Admin" ? (
              <ASidebar /> // Renders the Admin Sidebar
            ) : loggedInUser?.role === "Delivery Boy" ? (
              <BSidebar /> // Renders the Delivery Boy Sidebar
            ) : (
              <Sidebar /> // Default Sidebar for other users
            )}
          </>
        ) : (
          null // You can render something else here if no user is logged in
        )
      }
        <div className="bg-gray-100 flex items-center justify-center w-screen ">
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-center mb-6">
              <img
                src="https://via.placeholder.com/150" // Replace with user's profile image
                alt="User Profile"
                className="w-32 h-32 rounded-full border-4 border-indigo-500"
              />
            </div>

            {isEditing ? (
              <UpdateProfile userInfo={userInfo} setUserInfo={setUserInfo} setIsEditing={setIsEditing} />
            ) : (
              <>
                <h2 className="text-2xl font-semibold text-center mb-4">{userInfo.name}</h2>
                <p className="text-gray-600 text-center mb-6">{userInfo.email}</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Business Name:</span>
                    <span className="text-gray-600">{userInfo.bname}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Phone:</span>
                    <span className="text-gray-600">{userInfo.number}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Address:</span>
                    <span className="text-gray-600">{userInfo.address}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Role:</span>
                    <span className="text-gray-600">{userInfo.role}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Member Since:</span>
                    <span className="text-gray-600">
                      {new Date(userInfo.createdAt).toLocaleDateString()} {/* Format the date */}
                    </span>
                  </div>

                </div>

                <div className="mt-6 text-center">
                  <button
                    className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

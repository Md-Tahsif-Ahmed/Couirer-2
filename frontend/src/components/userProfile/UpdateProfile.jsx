import React, { useState } from 'react';
import apiClient from '../../axiosInstance';
const UpdateProfile = ({ userInfo, setUserInfo, setIsEditing }) => {
  const [updatedInfo, setUpdatedInfo] = useState(userInfo);
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  // Handle input changes for profile fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  // Handle input changes for password fields
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prevPasswords) => ({ ...prevPasswords, [name]: value }));
  };

  // Save changes
  const handleSave = async () => {
    try {
      const response = await apiClient.patch(
        `/api/user/update/${updatedInfo.email}`,  // Use user ID here instead of email
        updatedInfo
      );
      if (response.status === 200) {
        setUserInfo(updatedInfo);
        setIsEditing(false);
        alert('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-semibold text-center mb-4">Edit Profile</h2>
      <div className="space-y-4">
        <input
          type="text"
          name="name"
          value={updatedInfo.name}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Name"
        />
        <input
          type="text"
          name="bname"
          value={updatedInfo.bname}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Business Name"
        />
        <input
          type="text"
          name="number"
          value={updatedInfo.number}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Phone"
        />
        <input
          type="text"
          name="address"
          value={updatedInfo.address}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Address"
        />

        {/* Optional password change */}
        <input
          type="password"
          name="oldPassword"
          value={passwords.oldPassword}
          onChange={handlePasswordChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Old Password"
        />
        <input
          type="password"
          name="newPassword"
          value={passwords.newPassword}
          onChange={handlePasswordChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="New Password"
        />
        <input
          type="password"
          name="confirmNewPassword"
          value={passwords.confirmNewPassword}
          onChange={handlePasswordChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Confirm New Password"
        />
      </div>
      <div className="mt-6 text-center">
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mr-4" onClick={handleSave}>
          Save
        </button>
        <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600" onClick={() => setIsEditing(false)}>
          Cancel
        </button>
      </div>
    </>
  );
};

export default UpdateProfile;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams
import Swal from 'sweetalert2';
import Navbar from "../../../Pages/Shared/Navbar";
import ASidebar from "../../Shared/Asidebar";

const role = ['Marchant', 'Admin', 'Courier', 'Delivery Boy'];

import apiClient from '../../../axiosInstance';

const UpdateUser = () => {
  const { id } = useParams(); // Get user ID from URL
  const [formData, setFormData] = useState({
    role: ''
  });

  const navigate = useNavigate();

  // Fetch existing user data
  useEffect(() => {
    console.log("User ID from URL:", id);  // Debugging line
    const fetchUser = async () => {
        try {
            const response = await apiClient.get(`/api/user/${id}`);
            const user = response.data;
            setFormData({
                role: user.role || ''
            });
        } catch (error) {
            console.error('Error fetching user data:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to fetch user data. Please try again.',
                icon: 'error',
                confirmButtonText: 'Okay'
            });
        }
    };

    fetchUser();
}, [id]);

  // Handle form changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send PATCH request to update user
      const response = await apiClient.patch(`/api/user/${id}`, formData);
      console.log("##########", response);

      const upuser = response.data.user;
      console.log('Updated User:', upuser);
      console.log('Updated User ID:', upuser._id);

      // Show success alert
      Swal.fire({
        title: 'Success!',
        text: 'User updated successfully.',
        icon: 'success',
        confirmButtonText: 'Done'
      });

      // Navigate to the user display page
      navigate('/adminboard/user-display', { state: { upuser } });

    } catch (error) {
      console.error('Error updating the form:', error);
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Failed to update user. Please try again.',
        icon: 'error',
        confirmButtonText: 'Okay'
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        <ASidebar />
        <div className="bg-gray-100 p-8 w-screen">
          <div className="my-6">
            <h1 className="text-center font-semibold text-5xl mb-8">Update User Info.</h1>
            <form onSubmit={handleSubmit} className="p-16 bg-white shadow-sm">
              <div className="grid grid-cols-2 gap-4">
                {/* Role */}
                <div>
                  <label className="block text-gray-700">User Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  >
                    {role.map((dis) => (
                      <option key={dis} value={dis}>{dis}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded transition duration-200"
              >
                Update User
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateUser;

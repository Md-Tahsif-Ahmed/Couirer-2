// Signup.jsx
import emailjs from '@emailjs/browser'; // Import EmailJS
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import apiClient from '../../axiosInstance';
const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    address: "",
    bname: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Function to send confirmation email
  const sendConfirmationEmail = (name, email) => {
    // const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;       // 'service_hif5and'
    // const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;     // 'template_itcg9u7'
    // const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;       // '-rKJeI0iB4ZX-hOPq'
       const serviceID = 'service_8iam5rd';
       const templateID = 'template_zi6flin';
       const publicKey = 'WJSYNUeNyzZtaUYAS';

    const templateParams = {
      name: name,
      email: email,
      // Add other parameters if your template requires
    };

    return emailjs.send(serviceID, templateID, templateParams, publicKey);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic client-side validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      // Replace with your backend URL
      const response = await apiClient.post('/api/auth/register', {
        name: formData.name,
        email: formData.email,
        number: formData.number,
        address: formData.address,
        bname: formData.bname,
        password: formData.password,
        // role: 'user', // Optional: Include if your backend requires a role
      });

      // Assuming the backend sends a token upon successful registration
      const { token } = response.data;

      // Store the token (you can use localStorage or any state management library)
      localStorage.setItem("token", token);

      // Send confirmation email
      await sendConfirmationEmail(formData.name, formData.email)
        .then(() => {
          Swal.fire({
            title: 'Success!',
            text: 'Registration successful! A confirmation email has been sent to your email address.',
            icon: 'success',
            confirmButtonText: 'Done'
          });
        })
        .catch((error) => {
          console.error('Failed to send confirmation email:', error);
          Swal.fire({
            title: 'Warning!',
            text: 'Registration successful, but failed to send confirmation email.',
            icon: 'warning',
            confirmButtonText: 'Okay'
          });
        });

      // Redirect to login or another page after successful registration
      navigate("/login");
    } catch (err) {
      console.error(err);
      // Handle errors from the backend
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-white bg-center flex items-center justify-center">
      <div className="bg-gray-600 bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg p-8 md:p-12 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-black">
              Full Name
            </label>
            <input
              placeholder="Enter your name"
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              placeholder="Enter your email"
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              required
            />
          </div>
          {/* tahsif new  */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-black">
              Phone Number
            </label>
            <input
              placeholder="Enter your number"
              type="text"
              name="number"
              id="number"
              value={formData.number}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
              required
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-black">
              Address of Pickup Location
            </label>
            <input
              placeholder="Enter your address"
              type="text"
              name="address"
              id="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
              required
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-black">
              Business Name
            </label>
            <input
              placeholder="Enter your name"
              type="text"
              name="bname"
              id="bname"
              value={formData.bname}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
              required
            />
          </div>
          {/* tahsif end */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black">
              Password
            </label>
            <input
              placeholder="Password"
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none text-black focus:ring-2 focus:ring-blue-500 bg-white"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              placeholder="Confirm Password"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`w-1/2 py-3 text-white bg-green-500 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-black mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-gray-600 hover:text-gray-700 font-bold">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;

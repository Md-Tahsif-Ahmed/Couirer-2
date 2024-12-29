import React, { useState } from "react";
import Swal from "sweetalert2";
import apiClient from '../../../../axiosInstance';
import Navbar from "../../../../Pages/Shared/Navbar";
import ASidebar from "../../../Shared/Asidebar";
function AddBoy() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("");
  const [password, setPassword] = useState("");


  const handleNameChange = (value) => {

    setName(value);
    setBusiness(value); // Auto-fill password with number number

  };

  const handleNumberChange = (e) => {
    const numberValue = e.target.value;
    setNumber(numberValue);
    setPassword(numberValue); // Auto-fill password with number number

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        name,
        email,
        number,
        address,
        business, // Empty for AddBoy
        password,
        role: status, // Pass status as the role
      };

      const response = await apiClient.post("/api/auth/register", formData);

      if (response.status === 201) {
        Swal.fire({
          title: "Success!",
          text: "Member registered successfully.",
          icon: "success",
          confirmButtonText: "Done",
        });
        // Clear form fields after successful submission
        setEmail("");
        setName("");
        setNumber("");
        setAddress("");
        setStatus("");
        setPassword("");

      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Something went wrong!",
        icon: "error",
        confirmButtonText: "Retry",
      });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="flex">
        <ASidebar />
        <div className="flex-grow p-6">
          <h2 className="text-2xl font-semibold mb-6">Register Member</h2>
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded p-6 space-y-4 max-w-lg mx-auto"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">number</label>
              <input
                type="tel"
                value={number}
                onChange={handleNumberChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter number number"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter address"
                rows="3"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select status</option>
                <option value="PickUp Boy">PickUp Boy</option>
                <option value="Delivery Boy">Delivery Boy</option>
                <option value="Accountant">Accountant</option>
                <option value="Hub Manager">Manager</option>
                <option value="Data Entry Oparator">Data Entry Oparator</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white font-medium p-2 rounded-md shadow-sm hover:bg-purple-800 transition">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBoy;

// Addparcel.jsx
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from "../../contexts/AuthContext";
import Navbar from "../Shared/Navbar";
import Sidebar from "../Shared/Sidebar";
import { sendAdminNotificationEmail, sendUserConfirmationEmail } from './utils'; // Import email functions

import apiClient from '../../axiosInstance';
const districts = [
  "Bagerhat", "Bandarban", "Barguna", "Barishal", "Bhola", "Bogura", "Brahmanbaria",
  "Chandpur", "Chattogram", "Chuadanga", "Cox's Bazar", "Cumilla", "Dhaka City",
  "Dinajpur", "Faridpur", "Feni", "Gaibandha", "Gazipur", "Gopalganj", "Habiganj",
  "Jamalpur", "Jashore", "Jhalokathi", "Jhenaidah", "Joypurhat", "Khagrachari",
  "Khulna", "Kishoreganj", "Kurigram", "Kushtia", "Lakshmipur", "Lalmonirhat",
  "Madaripur", "Magura", "Manikganj", "Meherpur", "Moulvibazar", "Munshiganj",
  "Mymensingh", "Naogaon", "Narail", "Narayanganj", "Narsingdi", "Natore",
  "Netrokona", "Nilphamari", "Noakhali", "Pabna", "Panchagarh", "Patuakhali",
  "Pirojpur", "Rajbari", "Rajshahi", "Rangamati", "Rangpur", "Satkhira",
  "Shariatpur", "Sherpur", "Sirajganj", "Sunamganj", "Sylhet", "Tangail",
  "Thakurgaon"
];

const Addparcel = () => {
  const { user, token } = useContext(AuthContext);
  console.log('ccccccccc', user);
  console.log('xxxxx', user);
  const [receiverNumber, setReceiverNumber] = useState('');
  const [formData, setFormData] = useState({
    // sphone: '',
    rphone: '',
    // sname: '',
    rname: '',
    // semail: '',
    remail: '',
    // saddress: '',
    raddress: '',
    sdistrict: 'Dhaka City', // Initialized to default value
    rdistrict: 'Dhaka City', // Initialized to default value
    codAmount: 0,
    invoice: '',
    note: '',
    weight: 0,
    // exchange: false,
    dtype: 'home' // Default delivery type
  });

  const navigate = useNavigate();

    // Fetch existing parcel data
    const handleNumberChange = async (e) => {
      const rphone = e.target.value;
      setReceiverNumber(rphone);

        if (rphone.length === 10) { // e.g., when the number reaches a specific length

        try {
          const response = await apiClient.get(`/api/consignment/receiver/${rphone}`);
          const parcel = response.data;
          console.log("..........", parcel);
          setFormData({
            // sphone: parcel.sphone || '',
            rphone: parcel.rphone || '',
            // sname: parcel.sname || '',
            rname: parcel.rname || '',
            // semail: parcel.semail || '',
            remail: parcel.remail || '',
            // saddress: parcel.saddress || '',
            raddress: parcel.raddress || '',
            sdistrict: parcel.sdistrict || 'Dhaka City',
            rdistrict: parcel.rdistrict || 'Dhaka City',
            codAmount: parcel.codAmount || 0,
            invoice: parcel.invoice || '',
            note: parcel.note || '',
            weight: parcel.weight || 0,
            dtype: parcel.dtype || 'home'
          });
        } catch (error) {
          console.error('Error fetching parcel data:', error);
          Swal.fire({
            title: 'Error!',
            text: 'Failed to fetch parcel data. Please try again.',
            icon: 'error',
            confirmButtonText: 'Okay'
          });
        }
      }
      };


  // Handle radio button changes for delivery type
  const handleRadioChange = (e) => {
    setFormData({
      ...formData,
      dtype: e.target.value
    });
  }

  // Handle all input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Function to calculate COD based on weight, sender district, and receiver district
  const handleCalculate = async () => {
    try {
      const response = await apiClient.post("/cal-price", {
        weight: parseFloat(formData.weight),
        sdistrict: formData.sdistrict,
        rdistrict: formData.rdistrict,
      });
      setFormData(prevData => ({
        ...prevData,
        codAmount: response.data.price
      }));
    } catch (error) {
      console.error("Error calculating price", error);
      Swal.fire({
        title: 'Calculation Error!',
        text: 'Unable to calculate COD Amount. Please check your inputs.',
        icon: 'error',
        confirmButtonText: 'Okay'
      });
    }
  };

  // Effect to recalculate COD Amount whenever weight, sender district, or receiver district changes
  useEffect(() => {
    if (formData.weight > 0) {
      handleCalculate();
    } else {
      setFormData(prevData => ({
        ...prevData,
        codAmount: 0
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.weight, formData.sdistrict, formData.rdistrict]);

  console.log('hello......', formData);
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  const updatedFormData = {
    ...formData,    // Spread the existing form data fields
    sname: user.username,  // Add the sname field
    sphone: user.number,
    semail: user.email,
    saddress: user.address,
  };
    try {
      // Send POST request to add parcel
      const response = await apiClient.post('/api/parcels', updatedFormData,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
    );
      console.log(response);

      const parcel = response.data.consignment;
      console.log('Parcel ID:', parcel._id);

      // Send confirmation email to user
      await sendUserConfirmationEmail(
        user.username,
        formData.rname,
        user.email,
        formData.remail,
        parcel._id,
        user.number,
        formData.rphone,
        user.address,
        formData.raddress,
        formData.weight,
        formData.codAmount,
        // formData.exchange
      )
      .then(() => {
        console.log('User confirmation email sent successfully.');
      })
      .catch((error) => {
        console.error('Failed to send user confirmation email:', error);
        // Optionally, notify the user that email sending failed
      });

      // Send notification email to admin
      await sendAdminNotificationEmail(
        user.username,
        formData.rname,
        user.email,
        formData.remail,
        parcel._id,
        user.number,
        formData.rphone,
        user.address,
        formData.raddress,
        formData.weight,
        formData.codAmount,
        // formData.exchange
      )
      .then(() => {
        console.log('Admin notification email sent successfully.');
      })
      .catch((error) => {
        console.error('Failed to send admin notification email:', error);
        // Optionally, notify the admin or log the error
      });

      // Show success alert
      Swal.fire({
        title: 'Success!',
        text: 'Parcel added successfully and emails have been sent.',
        icon: 'success',
        confirmButtonText: 'Done'
      });

      // Navigate to the label/invoice page
      navigate(`/userboard/label/${parcel._id}`, { state: { parcel } });

    } catch (error) {
      console.error('Error submitting the form:', error);
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Failed to add parcel. Please try again.',
        icon: 'error',
        confirmButtonText: 'Okay'
      });
    }
  };

  return (
    <>
    <Navbar></Navbar>
    <div className="flex">
      <Sidebar />
      <div className="bg-gray-100 p-8 w-screen">
      <div className="my-6">
        <h1 className="text-center font-semibold text-5xl mb-8">Please Add Your Parcel</h1>
        <form onSubmit={handleSubmit} className="p-16 bg-white shadow-sm">
          <div className="grid grid-cols-2 gap-4">
            {/* Delivery Type */}
            <div className="flex col-span-2">
              <div className="flex items-center mr-4">
                <input
                  type="radio"
                  name="dtype"
                  value="home"
                  checked={formData.dtype === 'home'}
                  onChange={handleRadioChange}
                  className="mr-2" />
                <label className="text-gray-700">Home Delivery</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="dtype"
                  value="point"
                  checked={formData.dtype === 'point'}
                  onChange={handleRadioChange}
                  className="mr-2" />
                <label className="text-gray-700">Point Delivery</label>
              </div>
            </div>




            {/* Receiver Phone */}
            <div>
              <label className="block text-gray-700">Receiver Phone#</label>
              <input
                type="text"
                name="rphone"
                // value={formData.rphone}
                value={formData.receiverNumber}
                // onChange={handleChange}
                onChange={handleNumberChange}
                className="w-full p-2 border rounded"
                placeholder="Type Phone Number" />
            </div>


            {/* Receiver Name */}
            <div>
              <label className="block text-gray-700">Receiver Name</label>
              <input
                type="text"
                name="rname"
                value={formData.rname}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Type Receiver Name" />
            </div>


            {/* Receiver Email */}
            <div>
              <label className="block text-gray-700">Receiver Email</label>
              <input
                type="email"
                name="remail"
                value={formData.remail}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Type Receiver Email" />
            </div>


            {/* Receiver Address */}
            <div>
              <label className="block text-gray-700">Receiver Address</label>
              <input
                type="text"
                name="raddress"
                value={formData.raddress}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Type Receiver Address" />
            </div>

            {/* Sender District */}
            <div>
              <label className="block text-gray-700">Sender District</label>
              <select
                name="sdistrict"
                value={formData.sdistrict}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                {districts.map((dis) => (
                  <option key={dis} value={dis}>{dis}</option>
                ))}
              </select>
            </div>

            {/* Receiver District */}
            <div>
              <label className="block text-gray-700">Receiver District</label>
              <select
                name="rdistrict"
                value={formData.rdistrict}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                {districts.map((dis) => (
                  <option key={dis} value={dis}>{dis}</option>
                ))}
              </select>
            </div>


            {/* Weight */}
            <div>
              <label className="block text-gray-700">Weight (KG)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="0"
                min="0" // Prevent negative weights
                step="0.01" // Allow decimal weights
              />
            </div>
              {/* COD Amount */}
              <div>
              <label className="block text-gray-700">COD Amount</label>
              <input
                type="number"
                name="codAmount"
                value={formData.codAmount}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Cash on Delivery Amount"
                readOnly // Make it read-only
              />
            </div>
              {/* Invoice */}
              <div>
              <label className="block text-gray-700">Invoice</label>
              <input
                type="text"
                name="invoice"
                value={formData.invoice}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Type Invoice (If any)" />
            </div>


            {/* Note */}
            <div className="col-span-2">
              <label className="block text-gray-700">Note</label>
              <textarea
                name="note"
                value={formData.note}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Type Note (max 400 chars)"
                maxLength="400" // Enforce character limit
              />
            </div>

            {/* Exchange */}

          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
      </div>
    </div>
    </>
  );
};

export default Addparcel;

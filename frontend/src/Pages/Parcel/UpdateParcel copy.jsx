// UpdateParcel.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams
import Swal from 'sweetalert2';
import Navbar from "../Shared/Navbar";
import Sidebar from "../Shared/Sidebar";

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

const UpdateParcel = () => {
  const { id } = useParams(); // Get parcel ID from URL
  const [formData, setFormData] = useState({
    sphone: '',
    rphone: '',
    sname: '',
    rname: '',
    semail: '',
    remail: '',
    saddress: '',
    raddress: '',
    sdistrict: 'Dhaka City',
    rdistrict: 'Dhaka City',
    codAmount: 0,
    invoice: '',
    note: '',
    weight: 0,
    dtype: 'home'
  });

  const navigate = useNavigate();

  // Fetch existing parcel data
  useEffect(() => {
    const fetchParcel = async () => {
      try {
        const response = await apiClient.get(`/api/consignment/${id}`);
        const parcel = response.data;
        console.log("..........", parcel);
        setFormData({
          sphone: parcel.sphone || '',
          rphone: parcel.rphone || '',
          sname: parcel.sname || '',
          rname: parcel.rname || '',
          semail: parcel.semail || '',
          remail: parcel.remail || '',
          saddress: parcel.saddress || '',
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
    };

    fetchParcel();
  }, [id]);

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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send PATCH request to update parcel
      const response = await apiClient.patch(`/api/consignment/${id}`, formData);
      console.log("##########", response);

      const upparcel = response.data.consignment;
      console.log('Updated Parcel:', upparcel);
      console.log('Updated Parcel ID:', upparcel._id);

      // Optionally, resend confirmation emails if necessary
      // Uncomment the following block if you want to resend emails upon update

      /*
      await sendUserConfirmationEmail(
        formData.sname,
        formData.rname,
        formData.semail,
        formData.remail,
        parcel._id,
        formData.sphone,
        formData.rphone,
        formData.saddress,
        formData.raddress,
        formData.weight,
        formData.codAmount,
      )
      .then(() => {
        console.log('User confirmation email sent successfully.');
      })
      .catch((error) => {
        console.error('Failed to send user confirmation email:', error);
      });

      await sendAdminNotificationEmail(
        formData.sname,
        formData.rname,
        formData.semail,
        formData.remail,
        parcel._id,
        formData.sphone,
        formData.rphone,
        formData.saddress,
        formData.raddress,
        formData.weight,
        formData.codAmount,
      )
      .then(() => {
        console.log('Admin notification email sent successfully.');
      })
      .catch((error) => {
        console.error('Failed to send admin notification email:', error);
      });
      */

      // Show success alert
      Swal.fire({
        title: 'Success!',
        text: 'Parcel updated successfully.',
        icon: 'success',
        confirmButtonText: 'Done'
      });

    //   // Navigate to the label/invoice page or another appropriate page
      navigate(`/userboard/con-unique/${upparcel._id}`, { state: { upparcel } });

    } catch (error) {
      console.error('Error updating the form:', error);
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Failed to update parcel. Please try again.',
        icon: 'error',
        confirmButtonText: 'Okay'
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="bg-gray-100 p-8 w-screen">
          <div className="my-6">
            <h1 className="text-center font-semibold text-5xl mb-8">Update Your Parcel</h1>
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


                {/* Sender Phone */}
                <div>
                  <label className="block text-gray-700">Sender Phone#</label>
                  <input
                    type="text"
                    name="sphone"
                    value={formData.sphone}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="Type Phone Number" />
                </div>

                {/* Receiver Phone */}
                <div>
                  <label className="block text-gray-700">Receiver Phone#</label>
                  <input
                    type="text"
                    name="rphone"
                    value={formData.rphone}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="Type Phone Number" />
                </div>

                {/* Sender Name */}
                <div>
                  <label className="block text-gray-700">Sender Name</label>
                  <input
                    type="text"
                    name="sname"
                    value={formData.sname}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="Type Sender Name" />
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

                {/* Sender Email */}
                <div>
                  <label className="block text-gray-700">Sender Email</label>
                  <input
                    type="email"
                    name="semail"
                    value={formData.semail}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="Type Sender Email" />
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

                {/* Sender Address */}
                <div>
                  <label className="block text-gray-700">Sender Address</label>
                  <input
                    type="text"
                    name="saddress"
                    value={formData.saddress}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="Type Sender Address" />
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
                Update Parcel
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateParcel;

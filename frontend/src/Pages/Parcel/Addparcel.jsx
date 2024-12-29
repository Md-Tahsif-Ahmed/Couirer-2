import { Checkbox } from "@material-tailwind/react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import apiClient from '../../axiosInstance';
import { AuthContext } from "../../contexts/AuthContext";
import Navbar from "../Shared/Navbar";
import Sidebar from "../Shared/Sidebar";
import { sendAdminNotificationEmail, sendUserConfirmationEmail } from "./utils";
const districts = [
  "Bagerhat",
  "Bandarban",
  "Barguna",
  "Barishal",
  "Bhola",
  "Bogura",
  "Brahmanbaria",
  "Chandpur",
  "Chattogram",
  "Chuadanga",
  "Gaibandha",
  "Gazipur",
  "Gopalganj",
  "Habiganj",
  "Jamalpur",
  "Jashore",
  "Jhalokathi",
  "Jhenaidah",
  "Joypurhat",
  "Khagrachari",
  "Khulna",
  "Kishoreganj",
  "Kurigram",
  "Kushtia",
  "Lakshmipur",
  "Lalmonirhat",
  "Madaripur",
  "Magura",
  "Manikganj",
  "Meherpur",
  "Moulvibazar",
  "Munshiganj",
  "Mymensingh",
  "Naogaon",
  "Narail",
  "Narayanganj",
  "Narsingdi",
  "Natore",
  "Netrokona",
  "Nilphamari",
  "Noakhali",
  "Pabna",
  "Panchagarh",
  "Patuakhali",
  "Pirojpur",
  "Rajbari",
  "Rajshahi",
  "Rangamati",
  "Rangpur",
  "Satkhira",
  "Shariatpur",
  "Sherpur",
  "Sirajganj",
  "Sunamganj",
  "Sylhet",
  "Tangail",
  "Thakurgaon",
];
const Addparcel = () => {
  const { user, token } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    rphone: "",
    rname: "",
    remail: "",
    raddress: "",
    sdistrict: "Dhaka City",
    rdistrict: "Dhaka City",
    codAmount: 0,
    price: 0,
    deliveryCharge: 0,
    invoice: "",
    note: "",
    weight: 0,
    dtype: "home",
    rthana: "",
    exchange: false,
  });

  const navigate = useNavigate();

  // Fetch parcel data by receiver's phone number
  const handleNumberChange = async (e) => {
    const rphone = e.target.value;
    setFormData((prevData) => ({ ...prevData, rphone }));

    if (rphone.length === 11) {
      try {
        const response = await apiClient.get(
          `/api/consignment/receiver/${rphone}`
        );
        const parcel = response.data;
        setFormData((prevData) => ({
          ...prevData,
          rphone: parcel.rphone || "",
          rname: parcel.rname || "",
          remail: parcel.remail || "",
          raddress: parcel.raddress || "",
          sdistrict: parcel.sdistrict || "Dhaka City",
          rdistrict: parcel.rdistrict || "Dhaka City",
          codAmount: parcel.codAmount || 0,
          price: parcel.price || 0,
          deliveryCharge: parcel.deliveryCharge || 0,
          invoice: parcel.invoice || "",
          note: parcel.note || "",
          weight: parcel.weight || 0,
          dtype: parcel.dtype || "home",
          rthana: parcel.rthana || "",
          exchange:parcel.exchange,
        }));
      } catch (error) {
        console.error("Error fetching parcel data:", error);
      }
    }
  };

  // Calculate COD Amount based on form data
  const handleCalculate = async () => {
    try {
      const response = await apiClient.post("/cal-price", {
        weight: parseFloat(formData.weight),
        sdistrict: formData.sdistrict,
        rdistrict: formData.rdistrict,
      });
      setFormData((prevData) => ({
        ...prevData,
        deliveryCharge: response.data.price,
      }));
    } catch (error) {
      console.error("Error calculating price", error);
      Swal.fire({
        title: "Calculation Error!",
        text: "Unable to calculate COD Amount. Please check your inputs.",
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
  };

  useEffect(() => {
    if (formData.weight > 0) {
      handleCalculate();
    } else {
      setFormData((prevData) => ({ ...prevData, deliveryCharge: 0 }));
    }
  }, [formData.weight, formData.sdistrict, formData.rdistrict]);

  // COD amount sum of price and delivery charge
  // Auto-calculate COD Amount based on price and deliveryCharge
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      codAmount:
        parseFloat(prevData.price) + parseFloat(prevData.deliveryCharge),
    }));
  }, [formData.price, formData.deliveryCharge]);

  const handleRadioChange = (e) => {
    setFormData({
      ...formData,
      dtype: e.target.value,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      marchantId: user.marchantId,
      sname: user.username,
      sphone: user.number,
      semail: user.email,
      saddress: user.address,
      userEmail: user.email,
    };

    try {
      const response = await apiClient.post(
        "/api/parcels",
        updatedFormData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const parcel = response.data.consignment;

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
        formData.price,
        formData.deliveryCharge,
        formData.invoice,
        formData.note
      )
        .then(() => {
          console.log("User confirmation email sent successfully.");
        })
        .catch((error) => {
          console.error("Failed to send user confirmation email:", error);
          // Optionally, notify the user that email sending failed
        });
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
        formData.price,
        formData.deliveryCharge,
        formData.invoice,
        formData.note
      )
        .then(() => {
          console.log("Admin notification email sent successfully.");
        })
        .catch((error) => {
          console.error("Failed to send admin notification email:", error);
          // Optionally, notify the admin or log the error
        });

      Swal.fire({
        title: "Success!",
        text: "Parcel added successfully and emails have been sent.",
        icon: "success",
        confirmButtonText: "Done",
      });

      navigate(`/userboard/label/${parcel._id}`, { state: { parcel } });
    } catch (error) {
      console.error("Error submitting the form:", error);
      Swal.fire({
        title: "Error!",
        text:
          error.response?.data?.message ||
          "Failed to add parcel. Please try again.",
        icon: "error",
        confirmButtonText: "Okay",
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
            <h1 className="text-center font-semibold text-5xl mb-8">
              Please Add Your Parcel
            </h1>
            <form onSubmit={handleSubmit} className="p-16 bg-white shadow-sm">
              <div className="grid grid-cols-2 gap-4">
                {/* Delivery Type */}
                {/* Delivery Type */}
                <div className="col-span-2">
                  {/* Radio Buttons Section */}
                  <div className="flex flex-row items-center">
                    <div className="flex items-center mr-4">
                      <input
                        type="radio"
                        name="dtype"
                        value="home"
                        checked={formData.dtype === "home"}
                        onChange={handleRadioChange}
                        className="mr-2"
                      />
                      <label className="text-gray-700">Home Delivery</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="dtype"
                        value="point"
                        checked={formData.dtype === "point"}
                        onChange={handleRadioChange}
                        className="mr-2"
                      />
                      <label className="text-gray-700">Point Delivery</label>
                    </div>
                  </div>

                  {/* Conditional Bangla Text */}
                  {formData.dtype === "point" && (
                    <p className="mt-2 text-sm text-teal-600 font-semibold">
                      পয়েন্ট ডেলিভারির ক্ষেত্রে প্রাপককে নিকটস্থ হাব থেকে
                      পার্সেল সংগ্রহ করতে হবে।
                    </p>
                  )}
                </div>

                {/* Receiver Phone */}
                <div>
                  <label className="block text-gray-700">Phone#</label>
                  <input
                    type="text"
                    name="rphone"
                    required
                    // value={formData.rphone}
                    value={formData.rphone}
                    // onChange={handleChange}
                    onChange={handleNumberChange}
                    className="w-full bg-gray-100 text-gray-800 p-2 border rounded"
                    placeholder="Type Phone Number"
                  />
                </div>
                {/* COD Amount */}
                <div>
                  <label className="block text-gray-700">COD Amount</label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full bg-gray-100 text-gray-800 p-2 border rounded"
                    placeholder="Type Cash on Delivery Amount"
                    // readOnly // Make it read-only
                  />
                </div>

                {/* Receiver Name */}
                <div>
                  <label className="block text-gray-700">Name</label>
                  <input
                    type="text"
                    name="rname"
                    value={formData.rname}
                    onChange={handleChange}
                    className="w-full bg-gray-100 text-gray-800 p-2 border rounded"
                    placeholder="Type Recipient Name"
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
                    className="w-full bg-gray-100 text-gray-800 p-2 border rounded"
                    placeholder="Type Invoice (If any)"
                  />
                </div>

                {/* Receiver Address */}
                <div>
                  <label className="block text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    name="raddress"
                    value={formData.raddress}
                    onChange={handleChange}
                    className="w-full bg-gray-100 text-gray-800 p-2 border rounded"
                    placeholder="Type Address"
                  />
                </div>

                {/* Note */}
                <div>
                  <label className="block text-gray-700">Note</label>
                  <input
                    type="text"
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    className="w-full bg-gray-100 text-gray-800 p-2 border rounded"
                    placeholder="Type Note (max 400 chars)"
                    maxLength="400" // Enforce character limit
                  />
                </div>

                {/* Receiver Email */}
                {/* <div>
                  <label className="block text-gray-700">Receiver Email</label>
                  <input
                    type="email"
                    name="remail"
                    value={formData.remail}
                    onChange={handleChange}
                    className="w-full bg-gray-100 text-gray-800 p-2 border rounded"
                    placeholder="Type Receiver Email"
                  />
                </div> */}

                {/* Sender District */}
                {/* <div>
                  <label className="block text-gray-700">Sender District</label>
                  <select
                    name="sdistrict"
                    value={formData.sdistrict}
                    onChange={handleChange}
                    className="w-full bg-gray-100 text-gray-800 p-2 border rounded"
                  >
                    {districts.map((dis) => (
                      <option key={dis} value={dis}>
                        {dis}
                      </option>
                    ))}
                  </select>
                </div> */}

                {/* Receiver District */}
                <div>
                  <label className="block text-gray-700">
                    District
                  </label>
                  <select
                    name="rdistrict"
                    value={formData.rdistrict}
                    onChange={handleChange}
                    className="w-full bg-gray-100 text-gray-800 p-2 border rounded"
                  >
                    {districts.map((dis) => (
                      <option key={dis} value={dis}>
                        {dis}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Weight */}
                <div>
                  <label className="block text-gray-700">Weight (KG)</label>
                  <input
                    type="text"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className="w-full bg-gray-100 text-gray-800 p-2 border rounded"
                    placeholder="Type Weight in KG"
                    min="0" // Prevent negative weights
                    step="0.01" // Allow decimal weights
                  />
                </div>
                {/* COD Amount */}
                {/* <div>
                  <label className="block text-gray-700">Delivery Charge</label>
                  <input
                    type="number"
                    name="deliveryCharge"
                    value={formData.deliveryCharge}
                    onChange={handleChange}
                    className="w-full bg-gray-100 text-gray-800 p-2 border rounded"
                    placeholder="Delivery Charge"
                    readOnly // Make it read-only
                  />
                </div> */}

                {/* COD Amount */}
                {/* <div>
                  <label className="block text-gray-700">COD Amount</label>
                  <input
                    type="number"
                    name="codAmount"
                    required
                    value={formData.codAmount}
                    onChange={handleChange}
                    className="w-full bg-gray-100 text-gray-800 p-2 border rounded"
                    placeholder="Cash on Delivery Amount"
                    // readOnly // Make it read-only
                  />
                </div> */}

                {/* Thana */}
               <div>
               <label className="block text-gray-700">Thana</label>
                  <input
                    type="text"
                    name="rthana"
                    value={formData.rthana}
                    onChange={handleChange}
                    className="w-full bg-gray-100 text-gray-800 p-2 border rounded"
                    placeholder="Thana"
                  />
               </div>
               <div>
                <label className="block text-gray-700">Exchange</label>
                <Checkbox
                  name="exchange"
                  checked={formData.exchange}
                  onChange={(e) =>
                    setFormData((prevData) => ({ ...prevData, exchange: e.target.checked }))
                  }
                  className="bg-gray-100"
                />
              </div>



              </div>



              {/* Submit Button */}
              <button
                type="submit"
                className="mt-4 w-full bg-purple-600 hover:bg-purple-800 text-white p-2 rounded transition duration-200"
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

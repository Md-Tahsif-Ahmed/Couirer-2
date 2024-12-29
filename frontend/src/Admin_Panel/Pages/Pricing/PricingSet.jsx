import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../../Pages/Shared/Navbar";
import ASidebar from "../../Shared/Asidebar";


import apiClient from '../../../axiosInstance';

const districts = [
  "Bagerhat", "Bandarban", "Barguna", "Barishal", "Bhola", "Bogura", "Brahmanbaria",
  "Chandpur", "Chattogram", "Chuadanga", "Cox's Bazar", "Cumilla", "Dhaka City",
  "Dinajpur", "Faridpur", "Feni", "Gaibandha", "Gazipur", "Gopalganj", "Habiganj",
  "Jamalpur", "Jessore", "Jhalokathi", "Jhenaidah", "Joypurhat", "Khagrachari",
  "Khulna", "Kishoreganj", "Kurigram", "Kushtia", "Lakshmipur", "Lalmonirhat",
  "Madaripur", "Magura", "Manikganj", "Meherpur", "Moulvibazar", "Munshiganj",
  "Mymensingh", "Naogaon", "Narail", "Narayanganj", "Narsingdi", "Natore",
  "Netrokona", "Nilphamari", "Noakhali", "Pabna", "Panchagarh", "Patuakhali",
  "Pirojpur", "Rajbari", "Rajshahi", "Rangamati", "Rangpur", "Satkhira",
  "Shariatpur", "Sherpur", "Sirajganj", "Sunamganj", "Sylhet", "Tangail",
  "Thakurgaon"
];
const services = ["Regular", "SameDay"];
const categories = ["Regular", "Document", "Book"];

const PricingSet = () => {
  const [from, setFrom] = useState("Dhaka City");
  const [destination, setDestination] = useState("Dhaka City");
  const [category, setCategory] = useState("Regular");
  const [serviceType, setServiceType] = useState("Regular");
  const [basePrice, setBasePrice] = useState(50);
  const [extraWeightPrice, setExtraWeightPrice] = useState(20);

  const handleUpdate = async () => {
    try {
      await apiClient.post("/pricing-set", {
        from,
        destination,
        category,
        serviceType,
        basePrice,
        extraWeightPrice,
      });
      alert("Price updated successfully");
    } catch (error) {
      console.error("Error updating price", error);
      alert("Failed to update price");
    }
  };

  return (
    <>
        <Navbar></Navbar>
        <div className="flex">
            <ASidebar></ASidebar>
            <div className="bg-gray-50 w-screen">
          
                <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
                 <div className="flex items-center justify-between">
                 <h1 className="text-xl font-semibold text-center mb-6">Update Pricing Rules</h1>
                 <Link to='/adminboard/price-uploading'><button className="btn bg-green-500 text-white hover:bg-green-600">Pricing Data Upload</button></Link>
                 </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                    <select
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    >
                    {districts.map((district) => (
                        <option key={district} value={district}>
                        {district}
                        </option>
                    ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                    <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    >
                    {districts.map((district) => (
                        <option key={district} value={district}>
                        {district}
                        </option>
                    ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                        {cat}
                        </option>
                    ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                    <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    >
                    {services.map((st) => (
                        <option key={st} value={st}>
                        {st}
                        </option>
                    ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Base Price (TK)</label>
                    <input
                    type="number"
                    value={basePrice}
                    onChange={(e) => setBasePrice(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Extra Weight Price (TK per KG)</label>
                    <input
                    type="number"
                    value={extraWeightPrice}
                    onChange={(e) => setExtraWeightPrice(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                <button
                    onClick={handleUpdate}
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                    Update Price
                </button>
                </div>
            </div>
        </div>
    </>
  );
};

export default PricingSet;

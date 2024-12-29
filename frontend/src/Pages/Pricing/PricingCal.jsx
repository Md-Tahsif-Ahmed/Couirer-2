import React, { useEffect, useState } from "react";
import apiClient from '../../axiosInstance';
import Navbar from "../Shared/Navbar";
import Sidebar from "../Shared/Sidebar";
import './inputform.css';
const districts = [
  "Bagerhat", "Bandarban", "Barguna", "Barishal", "Bhola", "Bogura", "Brahmanbaria",
  "Chandpur", "Chattogram", "Chuadanga", "Cox's Bazar", "Cumilla", "Dhaka",
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

const PricingCal = () => {
  const [from, setFrom] = useState("Dhaka City");
  const [destination, setDestination] = useState("Dhaka City");
  const [category, setCategory] = useState("Regular");
  const [serviceType, setServiceType] = useState("Regular");
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState(0);

  // Function to calculate price based on form inputs
  const handleCalculate = async () => {
    try {
      const response = await apiClient.post("/pricing-cal", {
        weight: parseFloat(weight),
        from,
        destination,
        category,
        serviceType,
      });
      setPrice(response.data.price);
    } catch (error) {
      console.error("Error calculating price", error);
    }
  };

  // Automatically calculate price when weight changes
  useEffect(() => {
    if (weight) {
      handleCalculate();
    }
  }, [weight, from, destination, category, serviceType]);

  return (
    <>
    <Navbar></Navbar>
    <div className="flex">
    <Sidebar></Sidebar>
    <div className="mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center">Calculate Your Delivery Charge</h1>
      <p className="text-center mb-4">You can easily calculate your delivery charge here</p>

      <div className="flex items-center justify-between space-x-1">
        <div>
          <label>From</label>
          <select value={from} onChange={(e) => setFrom(e.target.value)} className="input-field">
            {districts.map((district) => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Destination</label>
          <select value={destination} onChange={(e) => setDestination(e.target.value)} className="input-field">
            {districts.map((district) => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="input-field">
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Service Type</label>
          <select value={serviceType} onChange={(e) => setServiceType(e.target.value)} className="input-field">
            {services.map((st) => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Weight (KG)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="input-field"
          />
        </div>
      </div>

      <div className="text-center mt-4">
        <p className="text-2xl font-bold">{price} TK</p>
      </div>
    </div>
    </div>
    </>
  );
};

export default PricingCal;

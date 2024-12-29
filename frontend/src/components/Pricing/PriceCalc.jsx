import React, { useEffect, useState } from 'react';
import apiClient from '../../axiosInstance';
function PriceCalc() {
    const [fromDistrict, setFromDistrict] = useState('');
    const [toDistrict, setToDistrict] = useState('');
    const [parcelCategory, setParcelCategory] = useState('Regular');
    const [serviceCategory, setServiceCategory] = useState('Regular');
    const [weight, setWeight] = useState('');
    const [charge, setCharge] = useState(null);
    const [pricingData, setPricingData] = useState([]);

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

    // Fetch pricing data from the API
    useEffect(() => {
        const fetchPricingData = async () => {
            try {
                const response = await apiClient.get('/pricing-set');
                setPricingData(response.data);
            } catch (error) {
                console.error("Error fetching pricing data:", error);
            }
        };
        fetchPricingData();
    }, []);

    const calculateCharge = () => {
        let totalCharge = 0;

        // Find the relevant entry in pricingData based on selected fields
        const matchedEntry = pricingData.find((entry) =>
            entry.from === fromDistrict &&
            entry.destination === toDistrict &&
            entry.category === parcelCategory &&
            entry.serviceType === serviceCategory
        );

        if (matchedEntry) {
            const basePrice = matchedEntry.basePrice || 0;
            const extraWeightPrice = matchedEntry.extraWeightPrice || 0;

            // Calculate charge based on weight
            if (weight < 1) {
                totalCharge = basePrice; // Minimum charge under 1 kg
            } else {
                totalCharge = basePrice + Math.ceil(weight - 1) * extraWeightPrice; // Base + extra for weight over 1 kg
            }
        } else {
            alert('No pricing data available for the selected options.');
            return;
        }

        setCharge(totalCharge);
    };

    return (
        <div className="p-6 bg-white shadow-md rounded-lg mt-4 mx-2 md:mx-auto max-w-lg">
            <h2 className="text-2xl font-bold mb-4 text-black">Calculate Delivery Charges</h2>
            <form>
                {/* Form fields */}
                <div className="mb-4">
                    <label className="block mb-2 text-gray-800">From District:</label>
                    <select value={fromDistrict} onChange={(e) => setFromDistrict(e.target.value)} className="border p-2 w-full bg-white text-gray-700">
                        <option value="">Select a district</option>
                        {districts.map((district) => (
                            <option key={district} value={district}>{district}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-gray-800">To District:</label>
                    <select value={toDistrict} onChange={(e) => setToDistrict(e.target.value)} className="border p-2 w-full bg-white text-gray-700">
                        <option value="">Select a district</option>
                        {districts.map((district) => (
                            <option key={district} value={district}>{district}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-gray-800">Parcel Category:</label>
                    <select value={parcelCategory} onChange={(e) => setParcelCategory(e.target.value)} className="border p-2 w-full bg-white text-gray-700">
                        <option value="Regular">Regular</option>
                        <option value="Book">Book</option>
                        <option value="Document">Document</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-gray-800">Service Category:</label>
                    <select value={serviceCategory} onChange={(e) => setServiceCategory(e.target.value)} className="border p-2 w-full bg-white text-gray-700">
                        <option value="Regular">Regular</option>
                        <option value="Same Day">Same Day</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-gray-800">Weight (in kg):</label>
                    <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="border p-2 w-full bg-white text-gray-700"
                        min="0"
                        step="0.1"
                    />
                </div>

                <button
                    type="button"
                    onClick={calculateCharge}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Calculate Charge
                </button>
            </form>

            {charge !== null && (
                <div className="mt-4">
                    <h3 className="text-xl font-semibold">Total Charge: {charge} tk</h3>
                </div>
            )}
        </div>
    );
}

export default PriceCalc;

import React from 'react';
import './PricingBanner.css'; // Import the CSS file for styling

function PricingBanner() {
    return (
        <div className="mt-24">
            {/* Top Banner Section */}
            <div className="bg-gradient-to-r from-yellow-50 via-purple-50 to-red-50 text-black p-10 text-center rounded-t-lg shadow-lg">
                <h1 className="text-4xl font-extrabold text-green-500">
                    Calculate Delivery Charges!
                </h1>
                <h2 className="text-lg font-medium mt-2">
                    You can easily calculate your delivery charges.
                </h2>
            </div>
        </div>
    );
}

export default PricingBanner;
import React from 'react';
import { FaBullseye, FaEye } from 'react-icons/fa'; // Import icons for Mission and Vision

function MissionVision() {
  return (
    <div className="mt-8 px-4 md:px-8 lg:px-16 bg-white">
      <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16">
        
        {/* Mission Section with Gradient Background */}
        <div className="flex-1 p-6 rounded-lg shadow-md order-2 lg:order-1 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 text-black">
          <div className="flex items-center mb-4">
            <FaBullseye className="text-blue-700 text-3xl mr-2" />
            <h2 className="text-2xl font-semibold text-gray-800">Our Mission</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            To provide fast, secure, and affordable delivery services that empower businesses and
            individuals to reach new heights. Our goal is to bridge the gap between senders and recipients 
            with reliable and timely delivery, making us the courier service people trust.
          </p>
        </div>
        
        {/* Vision Section with Gradient Background */}
        <div className="flex-1 p-6 rounded-lg shadow-md order-1 lg:order-2 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 text-black">
          <div className="flex items-center mb-4">
            <FaEye className="text-green-700 text-3xl mr-2" />
            <h2 className="text-2xl font-semibold text-gray-800">Our Vision</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            To be a leading global courier service known for innovation, trust, and dedication to Marchant
            satisfaction. We envision a world where distances no longer limit connectivity and businesses 
            flourish with our support.
          </p>
        </div>

      </div>
    </div>
  );
}

export default MissionVision;

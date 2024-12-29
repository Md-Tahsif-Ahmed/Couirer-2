import React from 'react';
import { FaUsers, FaMotorcycle, FaMapMarkerAlt, FaBoxOpen } from 'react-icons/fa';

function Stats() {
  // Placeholder data; replace with actual data as needed
  const statsData = [
    { id: 1, icon: <FaUsers className="text-blue-600 text-4xl mb-2" />, title: 'Marchants', count: 120 },
    { id: 2, icon: <FaMotorcycle className="text-green-600 text-4xl mb-2" />, title: 'Delivery Men', count: 45 },
    { id: 3, icon: <FaMapMarkerAlt className="text-purple-600 text-4xl mb-2" />, title: 'Delivery Points', count: 30 },
    { id: 4, icon: <FaBoxOpen className="text-orange-600 text-4xl mb-2" />, title: 'Parcels Delivered', count: 1050 }
  ];

  return (
    <div className="mt-8 px-4 md:px-8 lg:px-16">
      <h2 className="text-3xl font-bold text-center mb-8">Our Statistics</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 mb-12">
        {statsData.map((stat) => (
          <div key={stat.id} className="bg-green-100 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            {stat.icon}
            <h3 className="text-xl font-semibold mt-4">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-800">{stat.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stats;

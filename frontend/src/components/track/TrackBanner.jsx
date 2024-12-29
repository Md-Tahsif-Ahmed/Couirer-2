import React, { useState } from 'react';

function TrackBanner() {
  const [parcelId, setParcelId] = useState('');

  const handleInputChange = (e) => {
    setParcelId(e.target.value);
  };

  const handleTrackParcel = () => {
    // Handle parcel tracking logic here
    console.log(`Tracking parcel with ID: ${parcelId}`);
  };

  return (
    <div className="bg-blue-200 text-black p-8 flex flex-col items-center space-y-4 rounded-lg shadow-lg mt-24">
      <h2 className="text-2xl font-semibold">Track Your Consignment</h2>
      <p className="text-sm mb-4">
      Now you can easily track your consignment
      </p>
      <div className="flex items-center space-x-2 w-full max-w-md">
        <input
          type="text"
          value={parcelId}
          onChange={handleInputChange}
          placeholder="Search Tracking Code Here..."
          className="w-full p-2 rounded-md text-gray-800 bg-white"
        />
        <button
          onClick={handleTrackParcel}
          className="bg-yellow-400 hover:bg-yellow-500 text-blue-800 font-bold py-2 px-4 rounded-md transition duration-200"
        >
          Track
        </button>
      </div>
    </div>
  );
}

export default TrackBanner;

import React from 'react';
import Lottie from 'react-lottie';
import pickupAnimation from '../assets/animations/Animation - 1727079877982.json'; // JSON animation file for pickup
import transitAnimation from '../assets/animations/Animation - 1727080316486.json'; // JSON animation file for transit
import deliveryAnimation from '../assets/animations/Animation - 1727080563038.json'; // JSON animation file for delivery

const CourierAnimation = () => {
  const defaultOptions = (animationData) => ({
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  });

  return (
    <div className="bg-purple-50 py-16">
      <h2 className="text-4xl font-extrabold text-purple-800 text-center mb-10">
        Top Speed Courier Process
      </h2>
      <div className="flex flex-col md:flex-row justify-center items-center gap-12 px-6">
        {/* Step 1: Parcel Pickup */}
        <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6">
          <Lottie options={defaultOptions(pickupAnimation)} height={200} width={200} />
          <h3 className="text-lg font-semibold mt-4 text-purple-800">Parcel Pickup</h3>
          <p className="text-gray-600 text-center mt-2">
            We pick up your parcel quickly and safely.
          </p>
        </div>

        {/* Step 2: In Transit */}
        <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6">
          <Lottie options={defaultOptions(transitAnimation)} height={200} width={200} />
          <h3 className="text-lg font-semibold mt-4 text-purple-800">In Transit</h3>
          <p className="text-gray-600 text-center mt-2">
            Your parcel moves swiftly to its destination.
          </p>
        </div>

        {/* Step 3: Parcel Delivery */}
        <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6">
          <Lottie options={defaultOptions(deliveryAnimation)} height={200} width={200} />
          <h3 className="text-lg font-semibold mt-4 text-purple-800">Parcel Delivery</h3>
          <p className="text-gray-600 text-center mt-2">
            We ensure safe and timely delivery to the recipient.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourierAnimation;

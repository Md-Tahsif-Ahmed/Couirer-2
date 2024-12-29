import React from "react";
import Image from "../../src/assets/BannerTopSpeed.png";
import { Link } from "react-router-dom";

function Banner() {
  return (
    <section className="bg-white w-full min-h-screen flex items-center justify-center">
      <div className="max-w-screen-2xl container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center text-center md:text-left">
        {/* Text and Button Part */}
        <div className="flex flex-col justify-center items-center md:items-start space-y-6 md:ml-10">
          <h1 className="font-extrabold text-4xl md:text-5xl text-gray-900 leading-tight">
            <span className="text-purple-800">Top Speed</span> Courier
          </h1>
          <p className="text-gray-600 text-lg md:text-xl">
            Your trusted partner in every journey. Delivering your parcels with{" "}
            <span className="text-purple-800 font-medium">speed</span> and{" "}
            <span className="text-purple-800 font-medium">reliability</span>.
          </p>
          <Link to="/signup">
          <button className="bg-purple-800 hover:bg-purple-900 text-white px-6 py-3 rounded-lg font-bold shadow-md transition-all">
            Become a Merchant
          </button>
          </Link>

        </div>

        {/* Image Part */}
        <div className="flex justify-center items-center">
          <img
            src={Image}
            className="w-full max-w-md md:max-w-lg transform hover:scale-105 transition-transform duration-500"
            alt="Top Speed Courier Banner"
          />
        </div>

        {/* Statistics Part */}
        <div className="flex flex-col justify-center items-center md:items-start space-y-6">
          {/* Total Merchants */}
          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-purple-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 11V5a3 3 0 00-6 0v6a3 3 0 106 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 12h12M6 16h12M6 20h12"
              />
            </svg>
            <div>
              <p className="text-xl font-bold text-gray-900">5000</p>
              <p className="text-gray-600">Merchants</p>
            </div>
          </div>

          {/* Delivery Boys */}
          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-purple-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 15h8m-4-9V4M8 19h8"
              />
            </svg>
            <div>
              <p className="text-xl font-bold text-gray-900">300</p>
              <p className="text-gray-600">Delivery Boys</p>
            </div>
          </div>

          {/* Delivery Points */}
          <div className="flex items-center space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-purple-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 20h.01M12 4v8m0 0H9m3 0h3"
              />
            </svg>
            <div>
              <p className="text-xl font-bold text-gray-900">51</p>
              <p className="text-gray-600">Delivery Points</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;

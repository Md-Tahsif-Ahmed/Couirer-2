import React from "react";
import banner from "../../assets/aboutridingboy.png";

function AboutCover() {
  return (
    <div className="px-4 md:px-8 lg:px-16 mt-12 pt-6 bg-white">
      {/* Heading with Gradient Background */}
      <h1
        className="text-3xl md:text-4xl font-bold text-center mb-6 mt-24 p-8 rounded-lg 
                    bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 text-black"
      >
        Top Speed Courier is the Best
      </h1>

      {/* Content Section */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-16">
        {/* Text Section with Heading, Paragraph, and Bullet Points */}
        <div className="flex-1 order-2 lg:order-1">
          {/* Subheading */}
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            About Us
          </h2>

          {/* Introductory Paragraph */}
          <p className="text-lg leading-relaxed text-gray-700 mb-4">
            At{" "}
            <span style={{ fontWeight: "bold", color: "purple" }}>
              Top Speed Courier Ltd
            </span>
            , we are dedicated to delivering excellence in every parcel delivery
            experience. Our team is committed to handling your parcels with
            utmost care and ensuring prompt delivery, no matter the distance.
            Here’s why we are the trusted choice for thousands:
          </p>

          {/* Bullet Points with Check Icons */}
          <ul className="text-lg leading-relaxed text-gray-700 space-y-4">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✔️</span>
              Fast and reliable parcel delivery services
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✔️</span>
              Advanced technology ensuring parcel safety
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✔️</span>
              Local and international delivery options
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✔️</span>
              Focused on Marchant satisfaction and efficiency
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✔️</span>
              Experienced professionals at every step
            </li>
          </ul>
        </div>

        {/* Image Section */}
        <div className="flex-1 order-1 lg:order-2">
          <img
            src={banner} // Image path
            alt="Courier Service"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}

export default AboutCover;

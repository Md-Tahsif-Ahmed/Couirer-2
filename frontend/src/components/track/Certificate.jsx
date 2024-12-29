import React from 'react';

function Certificate() {
  return (
    <div className="bg-gradient-to-r from-yellow-100 via-green-100 to-red-100  mt-6 mb-6 p-6 md:p-10">
      <h2 className="text-2xl font-semibold text-center text-black mb-8">
        Our Certifications and Memberships
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-6">
        
        {/* World Courier Organization Membership */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2 text-center">
          <h3 className="text-xl font-bold mb-4">World Courier Organization</h3>
          <p className="text-black">
            We are proud members of the World Courier Organization, committed to maintaining the highest standards of international logistics and delivery.
          </p>
        </div>
        
        {/* Bangladesh Government Certificate */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2 text-center">
          <h3 className="text-xl font-bold mb-4">Bangladesh Government Certification</h3>
          <p className="text-gray-700">
            Certified by the Bangladesh Government, we operate under legal authorization and adhere to all regulations for secure courier services.
          </p>
        </div>
        
      </div>
    </div>
  );
}

export default Certificate;

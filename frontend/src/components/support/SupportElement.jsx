import React from 'react';

function SupportElement() {
  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 bg-gradient-to-r from-green-100 via-red-100 to-blue-100 mt-6 mb-6 rounded-lg shadow-lg bg-white">
      {/* Left Column - Contact Cards */}
      <div className="grid grid-cols-2 gap-4 flex-1">
        
        {/* Card 1 - Call Us */}
        <div className="bg-white p-2 md:p-4 rounded-lg shadow-md flex flex-col items-center text-center">
          <span className="text-blue-500 text-xl md:text-2xl mb-2">📞</span>
          <h3 className="text-sm md:text-lg font-semibold text-black">Call Us at:</h3>
          <p className="text-gray-700 text-xs md:text-sm">01711-032133 (Hot Line)</p>
        </div>
        
        {/* Card 2 - Email Us */}
        <div className="bg-white p-2 md:p-4 rounded-lg shadow-md flex flex-col items-center text-center">
          <span className="text-green-500 text-xl md:text-2xl mb-2">📧</span>
          <h3 className="text-sm md:text-lg font-semibold text-black">Email Us at:</h3>
          <p className="text-gray-700 text-xs md:text-sm">topspeedcourierltd@gmail.com </p>
        </div>
        
        {/* Card 3 - Address */}
        <div className="bg-white p-2 md:p-4 rounded-lg shadow-md flex flex-col items-center text-center">
          <span className="text-red-500 text-xl md:text-2xl mb-2">📍</span>
          <h3 className="text-sm md:text-lg font-semibold text-black">Our Address:</h3>
          <p className="text-gray-700 text-xs md:text-sm">House # 34/A (1st Floor), Flat # 1B Road # 9/A, Dhanmondi, Dhaka.
          </p>
        </div>
        
        {/* Card 4 - Administrator */}
        <div className="bg-white p-2 md:p-4 rounded-lg shadow-md flex flex-col items-center text-center">
          <span className="text-purple-500 text-xl md:text-2xl mb-2">👤</span>
          <h3 className="text-sm md:text-lg font-semibold text-black">Our Administrator:</h3>
          <p className="text-gray-700 text-xs md:text-sm">01711-032133</p>
        </div>
      </div>
      
      {/* Right Column - Support Form */}
      <div className="bg-white p-6 rounded-lg shadow-md flex-1">
        <h3 className="text-2xl font-semibold text-center mb-6 text-black">Contact Support</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-black">Name</label>
            <input type="text" className="w-full p-2 border rounded-md bg-white" placeholder="Your Name" />
          </div>
          
          <div>
            <label className="block text-black">Contact</label>
            <input type="text" className="w-full p-2 border rounded-md bg-white" placeholder="Your Contact Number" />
          </div>
          
          <div>
            <label className="block text-black">Email</label>
            <input type="email" className="w-full p-2 border rounded-md bg-white" placeholder="Your Email" />
          </div>
          
          <div>
            <label className="block text-black">Workplace</label>
            <input type="text" className="w-full p-2 border rounded-md bg-white" placeholder="Your Workplace" />
          </div>
          
          <div>
            <label className="block text-black">Support Issue</label>
            <textarea className="w-full p-2 border rounded-md bg-white" placeholder="Describe your issue" />
          </div>
          
          <button type="submit" className="w-full bg-purple-800 text-white p-2 rounded-md mt-4">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default SupportElement;

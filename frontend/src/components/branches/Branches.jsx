import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';

const Branches = () => {
  const branches = [
    { id: 1, name: 'Shanti Nagar Branch', address: '22 Shanti Nagar Rd, Dhaka 1205, Bangladesh' },
    { id: 2, name: 'Mirpur Branch', address: 'House-37/01, Road-02, Section-06, Block-Kha, 10 Boundary Rd, Dhaka 1216, Bangladesh' },
    { id: 3, name: 'Uttara Branch', address: '20, House, 10 Alaol Ave, Dhaka 1230, Bangladesh' },
    { id: 4, name: 'Kakrail Branch', address: '22-23, Kakrail, Shantinagar Road, Dhaka-1217, Bangladesh' },
    { id: 5, name: 'Malitola Branch', address: '93-99, M.S. Complex, Malitola, Dhaka' },
    { id: 6, name: 'Supreme Court Branch', address: 'Supreme Court Point, Dhaka' },
    { id: 7, name: 'Elephant Road Branch', address: '334,347, Elephant Road, Dhaka' },
    { id: 8, name: 'Lalmatia Branch', address: '4/2 Lalmatia, B-Block, Opposite of Bank Asia, Mohammadpur, Dhaka' },
    { id: 9, name: 'Mohakhali Branch', address: 'D-5/1A, Rasulbagh, Mohakhali, Dhaka' },
    { id: 10, name: 'Savar Branch (Baipail Branch)', address: 'Baipail, Savar (Near D.E.P.Z), Dhaka' },
  ];

  return (
    <div className='bg-white'>
    <Navbar />
    <div className="container mx-auto p-6 mt-36 bg-white">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Our Branches in Dhaka</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {branches.map((branch) => (
          <div
            key={branch.id}
            className="border border-gray-300 rounded-lg shadow-lg p-4 bg-gradient-to-r from-blue-100 via-white to-blue-50 hover:shadow-xl transition-shadow duration-200"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-2">{branch.name}</h2>
            <p className="text-sm text-gray-600">{branch.address}</p>
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default Branches;

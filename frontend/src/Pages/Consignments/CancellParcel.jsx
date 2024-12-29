import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../../Admin_Panel/Pages/SectionTitle/SectionTitle';
import ASidebar from '../../Admin_Panel/Shared/Asidebar';
import apiClient from '../../axiosInstance';
import { AuthContext } from '../../contexts/AuthContext';
import Navbar from '../Shared/Navbar';
import Sidebar from '../Shared/Sidebar';
const CancellParcel = () => {
  const [parcels, setParcels] = useState([]);
  const { user, token } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchParcels = async () => {
      try {
        if(user?.email){
        const response = await apiClient.get(`/api/consignment`, {
        params: {
          parcel: searchTerm, // Search term
          status: "cancelled", // Ensure we only fetch "in review" parcels
          userEmail: user.email,
          role: user.role,
        },

      });
      console.log('Fetched pending parcels:', response);
      if (Array.isArray(response.data)) {
        const filteredParcels = response.data.filter(parcel => parcel.status === "cancelled");
        setParcels(filteredParcels); // Update state with filtered parcels
        } else {
          console.error('Unexpected response format:', response.data);
        }
      }
      } catch (error) {
        console.error('Error fetching parcels', error);
      }
    };

    fetchParcels();
  }, [user, searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page for new search results
  };


  return (
    <>

        <Navbar></Navbar>
        <div className="flex">
        {
          user?.role === "Admin"?<ASidebar></ASidebar>:<Sidebar></Sidebar>
        }
            <div className="p-8 bg-gray-100 w-screen">
                <SectionTitle heading="Cancell Parcels" searchTerm={searchTerm} handleSearch={handleSearch}></SectionTitle>
                <div className="flex items-center gap-2 mb-4 ">
                  <Link to='/userboard/con-details'><button className="bg-green-500 px-3 py-0.5 text-white rounded-sm font-medium">All</button></Link>
                  <Link to='/adminboard/in_review'><button className="bg-green-500 px-3 py-0.5 text-white rounded-sm font-medium">InReview</button></Link>
                  <Link to='/adminboard/pending'><button className="bg-green-500 px-3 py-0.5 text-white rounded-sm font-medium">Pending</button></Link>
                  <Link to='/userboard/approval'><button className="bg-green-500 px-3 py-0.5 text-white rounded-sm font-medium">Approved</button></Link>
                  <Link to='/boyboard/delevered'><button className="bg-green-500 px-3 py-0.5 text-white rounded-sm font-medium">Deliverd</button></Link>
                  <Link to='/userboard/reject'><button className="bg-green-500 px-3 py-0.5 text-white rounded-sm font-medium">Cancelled</button></Link>
                  <Link to='/boyboard/asign'><button className="bg-green-500 px-3 py-0.5 text-white rounded-sm font-medium">Asigned Parcel</button></Link>
                  <Link to='/boyboard/pickup'><button className="bg-green-500 px-3 py-0.5 text-white rounded-sm font-medium">Pickedup</button></Link>
                </div>
                <div className="bg-white shadow-sm p-8">
                    <table className="min-w-full printable-label">
                    <thead>
                        <tr>
                        <th className="py-0.5 px-4 text-center border-b">Parcel Id </th>
                        <th className="py-0.5 px-4 text-center border-b">Sender Name</th>
                        <th className="py-0.5 px-4 text-center border-b">Receiver Name</th>
                        <th className="py-0.5 px-4 text-center border-b">COD Amount</th>
                        <th className="py-0.5 px-4 text-center border-b">Status</th>
                        <th className="py-0.5 px-4 text-center border-b">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.length > 0 ? (
                        parcels.map(parcel => (
                            <tr key={parcel._id} className="border-t">
                            <td className="py-0.5 px-4 text-center border-b">{parcel._id}</td>
                            <td className="py-0.5 px-4 text-center border-b">{parcel.sname}</td>
                            <td className="py-0.5 px-4 text-center border-b">{parcel.rname}</td>
                            <td className="py-0.5 px-4 text-center border-b">{parcel.codAmount}</td>
                            <td className="py-0.5 px-4 text-center border-b"><span className='px-2 py-1 rounded-lg bg-red-800 text-white'>{parcel.status}</span></td>
                            <td className="py-0.5 px-2 text-center border-b"><Link to={`/userboard/con-unique/${parcel._id}`}><button className="bg-blue-600 text-white px-2 py-1 rounded">Views</button></Link></td>
                            </tr>
                        ))
                        ) : (
                        <tr>
                            <td colSpan="5" className="text-center py-4">
                            No Cancell parcels available.
                            </td>
                        </tr>
                        )}
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>

  );
};

export default CancellParcel;

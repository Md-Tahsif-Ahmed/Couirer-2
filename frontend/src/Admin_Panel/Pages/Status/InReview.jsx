import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../../Pages/Shared/Navbar';
import Sidebar from '../../../Pages/Shared/Sidebar';
import apiClient from '../../../axiosInstance';
import { AuthContext } from '../../../contexts/AuthContext';
import ASidebar from '../../Shared/Asidebar';
import SectionTitle from '../SectionTitle/SectionTitle';

const InReview = () => {
    const { user, token } = useContext(AuthContext);
    const [parcels, setParcels] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    console.log('jjjjjj', user);
    console.log('kkkkkk', token);
    useEffect(() => {
      const fetchParcels = async () => {
        try {
          if (user?.email) {
            const response = await apiClient.get(`/api/consignment`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              params: {
                parcel: searchTerm, // Search term
                status: "in review", // Ensure we only fetch "in review" parcels
                userEmail: user.email,
                role: user.role,
              },
            });

            if (Array.isArray(response.data)) {
              // Filter results on the frontend to ensure only "in review" status is displayed
              const filteredParcels = response.data.filter(parcel => parcel.status === "in review");

              setParcels(filteredParcels); // Update state with filtered parcels
            } else {
              console.error("Unexpected response format:", response.data);
            }
          }
        } catch (error) {
          console.error("Error fetching parcels", error);
        }
      };

      fetchParcels();
    }, [searchTerm, user, token]); // Dependency array

    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
      setCurrentPage(1); // Reset to the first page for new search results
    };

    return (
      <>
        <Navbar />
        <div className="flex">
          {
            user?.role === "Admin"?<ASidebar></ASidebar>:<Sidebar></Sidebar>
          }
          <div className="p-8 bg-gray-100 w-screen">
            <SectionTitle heading="InReview Parcels" searchTerm={searchTerm} handleSearch={handleSearch}></SectionTitle>
            <div className="flex items-center gap-2 mb-4">
              <Link to='/userboard/con-details'>
                <button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">All</button>
              </Link>
              <Link to='/adminboard/in_review'>
                <button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">InReview</button>
              </Link>
              <Link to='/adminboard/pending'>
                <button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">Pending</button>
              </Link>
              <Link to='/userboard/approval'>
                <button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">Approved</button>
              </Link>
              <Link to='/boyboard/delevered'>
                <button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">Delivered</button>
              </Link>
              <Link to='/userboard/reject'>
                <button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">Cancelled</button>
              </Link>
              <Link to='/boyboard/asign'><button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">Asigned Parcel</button></Link>
              <Link to='/boyboard/pickup'><button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">Pickedup</button></Link>
            </div>

            <div className="bg-white shadow-sm p-8">
              <table className="min-w-full printable-label">
                <thead>
                  <tr>
                  {/* <th>email</th> */}
                    <th className="py-0.5 px-4 text-center border-b">Parcel Id </th>
                    <th className="py-0.5 px-4 text-center border-b">Sender Name</th>
                    <th className="py-0.5 px-4 text-center border-b">Receiver Name</th>
                    <th className="py-0.5 px-4 text-center border-b">COD Amount</th>
                    <th className="py-0.5 px-4 text-center border-b">Status</th>
                    {user?.role === 'Admin' && (  // Add optional chaining to check if user exists
                      <th className="py-0.5 px-4 text-center border-b">Details</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {parcels.length > 0 ? (
                    parcels.map(parcel => (
                      <tr key={parcel._id} className="border-t">
                        {/* <td>{parcel.semail}</td> */}
                        <td className="py-0.5 px-4 text-center border-b">{parcel._id}</td>
                        <td className="py-0.5 px-4 text-center border-b">{parcel.sname}</td>
                        <td className="py-0.5 px-4 text-center border-b">{parcel.rname}</td>
                        <td className="py-0.5 px-4 text-center border-b">{parcel.codAmount}</td>
                        <td className="py-0.5 px-4 text-center border-b">
                          <span className='px-2 py-1 rounded-lg bg-yellow-800 text-white'>{parcel.status}</span>
                        </td>
                        {user?.role === 'Admin' && (  // Again, add optional chaining
                              <td className="py-0.5 px-2 text-center border-b">
                               <Link to={`/adminboard/parcel-review/${parcel.semail}`}>
                                <button className="bg-blue-600 text-white px-2 py-1 rounded">View</button>
                              </Link>
                            </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        No In Review parcels available.
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


export default InReview;

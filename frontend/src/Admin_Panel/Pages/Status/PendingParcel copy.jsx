import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from '../../../Pages/Shared/Navbar';
import Sidebar from '../../../Pages/Shared/Sidebar';
import { AuthContext } from '../../../contexts/AuthContext';
import ASidebar from '../../Shared/Asidebar';


import apiClient from '../../../axiosInstance';

const PendingParcel = () => {
    const { user, token } = useContext(AuthContext);
    const [parcels, setParcels] = useState([]);

    console.log('jjjjjj', user);
    console.log('kkkkkk', token);

    // useEffect(() => {
    //   const fetchParcels = async () => {
    //     try {

    //       // const response = await apiClient.get('/api/consignment?status=pending');
    //       const response = await apiClient.get(`/api/consignment?status=pending&userEmail=${user?.email}`);
    //       console.log('Fetched pending parcels:', response);
    //       if (Array.isArray(response.data)) {
    //         setParcels(response.data);  // Ensure it's an array
    //       } else {
    //         console.error('Unexpected response format:', response.data);
    //       }
    //     } catch (error) {
    //       console.error('Error fetching parcels', error);
    //     }
    //   };

    //   fetchParcels();
    // }, []);

    //   const fetchParcels = async () => {
    //     try {
    //       if (user?.email) {  // Ensure user is logged in and email is available
    //         const response = await apiClient.get(`/api/consignment?status=pending&userEmail=${user.email}`, {
    //           headers: {
    //             Authorization: `Bearer ${token}`,  // Pass the token in the request headers if needed for authentication
    //           },
    //         });
    //         console.log('Fetched pending parcels:', response);
    //         if (Array.isArray(response.data)) {
    //           setParcels(response.data);  // Ensure it's an array
    //         } else {
    //           console.error('Unexpected response format:', response.data);
    //         }
    //       } else {
    //         console.error('User is not logged in');
    //       }
    //     } catch (error) {
    //       console.error('Error fetching parcels', error);
    //     }
    //   };

    //   fetchParcels();
    // }, [user, token]);  // Ensure useEffect runs when user or token changes

  useEffect(() => {
  const fetchParcels = async () => {
    try {
      console.log('User:', user);  // Log the user object to see if it's available
      if (user?.email) {  // Ensure user is logged in and email is available
        const response = await apiClient.get(`/api/consignment?status=pending&userEmail=${user.email}`, {
          headers: {
            Authorization: `Bearer ${token}`,  // Pass the token in the request headers if needed for authentication
          },
        });
        console.log('Fetched pending parcels:', response);
        if (Array.isArray(response.data)) {
          setParcels(response.data);  // Ensure it's an array
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } else {
        console.error('User is not logged in or user email is undefined');
      }
    } catch (error) {
      console.error('Error fetching parcels', error);
    }
  };

  fetchParcels();
}, [user, token]);  // Ensure useEffect runs when user or token changes

    const approveParcel = async (parcelId) => {
      try {
        const response = await apiClient.patch(`/api/consignment/${parcelId}/approve`);
        console.log('Parcel approved:', response.data);
        setParcels(parcels.filter(parcel => parcel._id !== parcelId)); // Remove approved parcel from pending list
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: " Parcel Successfully Approved ",
          showConfirmButton: false,
          timer: 1500
        });
      } catch (error) {
        console.error('Error approving parcel', error);
      }
    };

    const rejectParcel = async (parcelId) => {
      try {
        const response = await apiClient.patch(`/api/consignment/${parcelId}/reject`);
        console.log('Parcel rejected:', response.data);
        setParcels(parcels.filter(parcel => parcel._id !== parcelId));
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: " Parcel Has been Rejected ",
          showConfirmButton: false,
          timer: 1500
        });
      } catch (error) {
        console.error('Error rejecting parcel', error);
      }
    };

    return (
      <>
        <Navbar />
        <div className="flex">
          {
            user?.role === "Admin"?<ASidebar></ASidebar>:<Sidebar></Sidebar>
          }
          <div className="p-8 bg-gray-100 w-screen">
            <h2 className="text-xl font-bold mb-6">Pending Parcels</h2>
            <div className="flex items-center gap-2 mb-4">
              <Link to='/userboard/con-details'>
                <button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">All</button>
              </Link>
              <Link to='/adminboard/pending'>
                <button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">Pending</button>
              </Link>
              <Link to='/userboard/approval'>
                <button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">Approval Pending</button>
              </Link>
              <Link>
                <button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">Delivered</button>
              </Link>
              <Link to='/userboard/reject'>
                <button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">Cancelled</button>
              </Link>
            </div>

            <div className="bg-white shadow-sm p-8">
              <table className="min-w-full printable-label">
                <thead>
                  <tr>
                  <th>email</th>
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
                        <td>{parcel.semail}</td>
                        <td className="py-0.5 px-4 text-center border-b">{parcel.sname}</td>
                        <td className="py-0.5 px-4 text-center border-b">{parcel.rname}</td>
                        <td className="py-0.5 px-4 text-center border-b">{parcel.codAmount}</td>
                        <td className="py-0.5 px-4 text-center border-b">
                          <span className='px-2 py-1 rounded-lg bg-yellow-800 text-white'>{parcel.status}</span>
                        </td>
                        {user?.role === 'Admin' && (  // Again, add optional chaining
                          <td className="py-0.5 px-4 text-center border-b">
                            <div className="space-x-2">
                              <button
                                className="bg-green-600 text-white py-1 px-2 rounded"
                                onClick={() => approveParcel(parcel._id)}
                              >
                                Approve
                              </button>
                              <button
                                className="bg-red-600 text-white py-1 px-2 rounded"
                                onClick={() => rejectParcel(parcel._id)}
                              >
                                Reject
                              </button>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        No pending parcels available.
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


export default PendingParcel;

import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from '../../../Pages/Shared/Navbar';
import Sidebar from '../../../Pages/Shared/Sidebar';
import { AuthContext } from '../../../contexts/AuthContext';
import BSidebar from '../../Shared/Bsidebar';

import apiClient from '../../../axiosInstance';
const ReadyParcel = () => {


  const [parcels, setParcels] = useState([]);
  const { user, token } = useContext(AuthContext);

  useEffect(() => {
    const fetchParcels = async () => {
      try {

        const response = await apiClient.get(`/api/consignment?status=approved`);
        console.log('Fetched Approval parcels:', response);
        if (Array.isArray(response.data)) {
          setParcels(response.data);  // Ensure it's an array
        } else {
          console.error('Unexpected response format:', response.data);
        }

      } catch (error) {
        console.error('Error fetching parcels', error);
      }
    };

    fetchParcels();
  }, []);
  // Asign Job for Delivery Boy.....
  const asignParcel = async (parcelId) => {
    try {
      const response = await apiClient.patch(
        `/api/consignment/${parcelId}/asign-job`,
        { boyEmail: user.email } // Pass the user's email in the request body
      );

      console.log('Parcel Assigned:', response.data);
      setParcels(parcels.filter(parcel => parcel._id !== parcelId)); // Remove the assigned parcel from the list
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Successfully Assigned Job for this Parcel",
        showConfirmButton: false,
        timer: 1800
      });
    } catch (error) {
      console.error('Error assigning parcel', error);
    }
  };


    return (
        <>
        <Navbar></Navbar>
        <div className="flex">
        {
          user?.role === "Delivery Boy"?<BSidebar></BSidebar>:<Sidebar></Sidebar>
        }
            <div className="p-8 bg-gray-100 w-screen">
                <h2 className="text-xl font-bold mb-6">Approval Parcels</h2>
                {/* <div className="flex items-center gap-2 mb-4 ">
                  <Link to='/userboard/con-details'><button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">All</button></Link>
                  <Link to='/adminboard/pending'><button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">Pending</button></Link>
                  <Link to='/userboard/approval'><button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">Approval Pending</button></Link>
                  <Link to='/boyboard/delevered'><button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">Deliverd</button></Link>
                  <Link to='/userboard/reject'><button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">Cancelled</button></Link>
              </div> */}
                <div className="bg-white shadow-sm p-8">
                    <table className="min-w-full printable-label">
                    <thead>
                        <tr>
                        <th className="py-0.5 px-4 text-center border-b">Sender Name</th>
                        <th className="py-0.5 px-4 text-center border-b">Receiver Name</th>
                        <th className="py-0.5 px-4 text-center border-b">COD Amount</th>
                        <th className="py-0.5 px-4 text-center border-b">Status</th>
                        <th className="py-0.5 px-4 text-center border-b">Pickup Date</th>
                        <th className="py-0.5 px-4 text-center border-b">Delivery Date</th>
                        <th className="py-0.5 px-4 text-center border-b">Details</th>
                        <th className="py-0.5 px-4 text-center border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.length > 0 ? (
                        parcels.map(parcel => (
                            <tr key={parcel._id} className="border-t">
                            <td className="py-0.5 px-4 text-center border-b">{parcel.sname}</td>
                            <td className="py-0.5 px-4 text-center border-b">{parcel.rname}</td>
                            <td className="py-0.5 px-4 text-center border-b">{parcel.codAmount}</td>
                            <td className="py-0.5 px-4 text-center border-b"><span className='px-2 py-1 rounded-lg bg-green-800 text-white'>{parcel.status}</span></td>
                            <td className='py-0.5 px-4 text-center border-b'>{new Date(parcel.pickupDate).toLocaleDateString('en-GB')}</td>
                            <td className='py-0.5 px-4 text-center border-b'>{new Date(parcel.deliveryDate).toLocaleDateString('en-GB')}</td>
                            <td className="py-0.5 px-2 text-center border-b"><Link to={`/userboard/con-unique/${parcel._id}`}><button className="bg-blue-600 text-white px-2 py-1 rounded">Views</button></Link></td>
                            <td className="py-0.5 px-2 text-center border-b"><button
                                className="bg-green-600 text-white py-1 px-2 rounded"
                                onClick={() => asignParcel(parcel._id)}
                              >
                                Asign Job
                              </button></td>
                            </tr>
                        ))
                        ) : (
                        <tr>
                            <td colSpan="5" className="text-center py-4">
                            No Approval parcels available.
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

export default ReadyParcel;
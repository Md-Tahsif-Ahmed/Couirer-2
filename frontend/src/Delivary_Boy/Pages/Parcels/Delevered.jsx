import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import SectionTitle from '../../../Admin_Panel/Pages/SectionTitle/SectionTitle';
import ASidebar from '../../../Admin_Panel/Shared/Asidebar';
import { AuthContext } from '../../../contexts/AuthContext';
import Navbar from '../../../Pages/Shared/Navbar';
import Sidebar from '../../../Pages/Shared/Sidebar';
import BSidebar from '../../Shared/Bsidebar';

import apiClient from '../../../axiosInstance';
const Delevered = () => {
    const [parcels, setParcels] = useState([]);
    const [balance, setBalance] = useState(0);
    const [transferAmount, setTransferAmount] = useState(0);
    const  { user, token } = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState('');


  // Fetch parcels when component mounts or when `searchTerm` changes
  useEffect(() => {
    const fetchParcels = async () => {
      try {
        if (user?.email) {
          let url = `/api/consignment`;
          const params = {
            status: "delivered",
            role: user.role,
            parcel: searchTerm,
          };

          if (user.role === "Delivery Boy") {
            params.boyEmail = user.email;
          } else if (user.role !== "Admin") {
            params.userEmail = user.email;
          }

          const response = await apiClient.get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params,
          });

          console.log("Fetched Delivered parcels:", response);
          if (Array.isArray(response.data)) {
            // Ensure only "delivered" parcels are displayed
            const filteredParcels = response.data.filter(
              (parcel) => parcel.status === "delivered"
            );
            setParcels(filteredParcels);
          }
        }
      } catch (error) {
        console.error("Error fetching parcels", error);
      }
    };

    fetchParcels();
  }, [user, token, searchTerm]); // Runs whenever `user`, `token`, or `searchTerm` changes

  // Fetch user balance when user changes
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user?.email) {
          const response = await apiClient.get(
            `/api/user/email/${user.email}`
          );
          console.log("User balance:", response.data);
          setBalance(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user]); // Runs whenever `user` changes

  // Handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const payParcel =  async (parcelId, codAmount) => {
    try {
      const response = await apiClient.patch(`/api/consignment/${parcelId}/payadmin`,
        { boyEmail: user.email }
      );


      console.log('Parcel payment Transfer:', response.data);
      setParcels(parcels.filter(parcel => parcel._id !== parcelId));
      setTransferAmount(transferAmount + codAmount);
      Swal.fire({
        position: "Top-center",
        icon: "success",
        title: "Delevered Successfully this Parcel",
        showConfirmButton: false,
        timer: 1800

      });
    } catch (error) {
      console.error('Error delevered Parcel', error);

    }
  };

    return (

    <>
      <Navbar />
      <div className="flex">
        {user ? (
          <>
            {user.role === "Admin" ? (
              <ASidebar />  // Admin Sidebar
            ) : user.role === "Delivery Boy" ? (
              <BSidebar />  // Delivery Boy Sidebar
            ) : (
              <Sidebar />  // Default Sidebar for other users
            )}
          </>
        ) : null}

        <div className="p-8 bg-gray-100 w-screen">
          <div className="flex justify-between items-center">
          <SectionTitle heading="Delivered Parcels" searchTerm={searchTerm} handleSearch={handleSearch}></SectionTitle>
            {user ? (
          <>
            {user.role === "Admin" ? (
               <p className='text-xl font-bold mb-6 text-green-600'><span className='text-black'>Pending Amount: </span>{balance.pendingBalance} Tk</p>
            ) : user.role === "Delivery Boy" ? (
              <p className='text-xl font-bold mb-6 text-green-600'><span className='text-black'>Recieved Amount: </span>{balance.balance} Tk</p>
            ): null}
          </>
        ) : null
        }

          </div>
          {user?.role !== "Delivery Boy"?(<div className="flex items-center gap-2 mb-4 ">
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
              </div>): ''}
          <div className="bg-white shadow-sm p-8">
            <table className="min-w-full printable-label">
              <thead>
                <tr>
                  <th className="py-0.5 px-4 text-center border-b">Parcel Id</th>
                  <th className="py-0.5 px-4 text-center border-b">Sender Name</th>
                  <th className="py-0.5 px-4 text-center border-b">Receiver Name</th>
                  <th className="py-0.5 px-4 text-center border-b">COD Amount</th>
                  <th className="py-0.5 px-4 text-center border-b">Status</th>
                  <th className="py-0.5 px-4 text-center border-b">Details</th>
                  {/* <th className="py-0.5 px-4 text-center border-b">Pickup Date</th> */}
                  <th className="py-0.5 px-4 text-center border-b">Delivery Date</th>
                  <th className="py-0.5 px-4 text-center border-b">Boy Info.</th>
                  {
                    user?.role ==="Delivery Boy"?( <th className='py-0.5 px-4 text center border-b'>Action</th>)
                    : null
                  }



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
                      <td className="py-0.5 px-4 text-center border-b">
                        <span className='px-2 py-1 rounded-lg bg-yellow-400 text-white'>{parcel.status}</span>
                      </td>

                      <td className="py-0.5 px-2 text-center border-b">
                        <Link to={`/userboard/con-unique/${parcel._id}`}>
                          <button className="bg-blue-600 text-white px-2 py-1 rounded">View</button>
                        </Link>
                      </td>
                      {/* <td py-0.5 px-4 text-center border-b>{new Date(parcel.pickupDate).toLocaleDateString('en-CA')}</td> */}
                      <td className='py-0.5 px-4 text-center border-b'>
                        {new Date(parcel.deliveryDate).toLocaleDateString('en-GB')}
                      </td>

                      <td className="py-0.5 px-4 text-center border-b">{parcel.boyEmail}</td>
                      {
                        user?.role === "Delivery Boy"?(<td className='py-0.5 px-4 text-center border-b'>
                          <button className='bg-green-600 text-white py-1 px-2 rounded'  onClick={() => payParcel(parcel._id, parcel.codAmount)}>Payment Transfer</button>
                          </td>): null
                      }



                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      No Asigned parcels available.
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

export default Delevered;
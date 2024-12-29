import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import ASidebar from '../../../Admin_Panel/Shared/Asidebar';
import { AuthContext } from '../../../contexts/AuthContext';
import Navbar from '../../../Pages/Shared/Navbar';
import Sidebar from '../../../Pages/Shared/Sidebar';
import BSidebar from '../../Shared/Bsidebar';

const Pickup = () => {
  const [parcels, setParcels] = useState([]);
  const [accountBalance, setAccountBalance] = useState(0);
  const [balance, setBalance] = useState(0);
  const { user, token } = useContext(AuthContext);
  import apiClient from '../../../axiosInstance';
  useEffect(() => {
    const fetchParcels = async () => {
      try {
        if (user?.email) {
          let url = `/api/consignment?status=pickedup&role=${user.role}`;

          // Add boyEmail or userEmail based on the role
          if (user.role === "Delivery Boy") {
            url += `&boyEmail=${user.email}`;
          } else if (user.role !== "Admin") {
            url += `&userEmail=${user.email}`;
          }

          const response = await apiClient.get(url);
          console.log('Fetched Asigned parcels:', response);
          if (Array.isArray(response.data)) {
            setParcels(response.data);
          }
        }
      } catch (error) {
        console.error('Error fetching parcels', error);
      }
    };

    fetchParcels();
  }, [user]);

  // ..........
  useEffect(() => {
    // Fetch the user data if email is available
    const fetchUserData = async () => {
        try {
            if (user?.email) {
                const response = await apiClient.get(`/api/user/email/${user.email}`);
                console.log('....ll', response.data);
                setBalance(response.data.pendingBalance);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    fetchUserData();
}, [user]); // Adding `user` as a dependency

  // delevered Parcel macanism
  const deleveredParcel =  async (parcelId, codAmount) => {
    try {
      const response = await apiClient.patch(`/api/consignment/${parcelId}/delivered`,
        { boyEmail: user.email }
      );


      console.log('Parcel Delivered:', response.data);
      setParcels(parcels.filter(parcel => parcel._id !== parcelId));
      setAccountBalance(accountBalance + codAmount);
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
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold mb-6">Pickedup Parcels</h2>
            <p className='text-xl font-bold mb-6 text-red-600'><span className='text-black'>Pending Amount: </span>{balance} Tk</p>
          </div>
          {user?.role !== "Delivery Boy"?(<div className="flex items-center gap-2 mb-4 ">
                  <Link to='/userboard/con-details'><button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">All</button></Link>
                  <Link to='/adminboard/pending'><button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">Pending</button></Link>
                  <Link to='/userboard/approval'><button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">Approved</button></Link>
                  <Link to='/boyboard/delevered'><button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">Deliverd</button></Link>
                  <Link to='/userboard/reject'><button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">Cancelled</button></Link>
                  <Link to='/boyboard/asign'><button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">Asigned Parcel</button></Link>
                  <Link to='/boyboard/pickup'><button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">Pickedup</button></Link>
              </div>): ''}

          <div className="bg-white shadow-sm p-8">
            <table className="min-w-full printable-label">
              <thead>
                <tr>
                  <th className="py-2 px-4 text-center border-b">Sender Name</th>
                  <th className="py-2 px-4 text-center border-b">Receiver Name</th>
                  <th className="py-2 px-4 text-center border-b">COD Amount</th>
                  <th className="py-2 px-4 text-center border-b">Status</th>
                  <th className="py-2 px-4 text-center border-b">Details</th>
                  <th className="py-2 px-4 text-center border-b">Pickup Date</th>
                  <th className="py-2 px-4 text-center border-b">Delivery Date</th>
                  <th className="py-2 px-4 text-center border-b">Boy Info.</th>
                  <th className='py-2 px-4 text center border-b'>Action</th>
                  <th className='py-2 px-4 text center border-b'>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {parcels.length > 0 ? (
                  parcels.map(parcel => (
                    <tr key={parcel._id} className="border-t">
                      <td className="py-2 px-4 text-center border-b">{parcel.sname}</td>
                      <td className="py-2 px-4 text-center border-b">{parcel.rname}</td>
                      <td className="py-2 px-4 text-center border-b">{parcel.codAmount}</td>
                      <td className="py-2 px-4 text-center border-b">
                        <span className='px-2 py-1 rounded-lg bg-yellow-400 text-white'>{parcel.status}</span>
                      </td>

                      <td className="py-2 px-2 text-center border-b">
                        <Link to={`/userboard/con-unique/${parcel._id}`}>
                          <button className="bg-blue-600 text-white px-2 py-1 rounded">View</button>
                        </Link>
                      </td>
                      <td py-2 px-4 text-center border-b>{new Date(parcel.pickupDate).toLocaleDateString('en-CA')}</td>
                      <td py-2 px-4 text-center border-b>{new Date(parcel.deliveryDate).toLocaleDateString('en-CA')}</td>
                      <td className="py-2 px-4 text-center border-b">{parcel.boyEmail}</td>
                      <td className='py-2 px-4 text-center border-b'>
                        <button className='bg-green-600 text-white py-1 px-2 rounded'  onClick={() => deleveredParcel(parcel._id, parcel.codAmount)}>Delivered</button>
                      </td>
                      <td className='py-2 px-4 text-center border-b'><textarea className="textarea textarea-accent" placeholder="Remark"></textarea></td>


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

export default Pickup;
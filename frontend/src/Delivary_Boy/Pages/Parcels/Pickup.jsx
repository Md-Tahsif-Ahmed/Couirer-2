import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import SectionTitle from '../../../Admin_Panel/Pages/SectionTitle/SectionTitle';
import ASidebar from '../../../Admin_Panel/Shared/Asidebar';
import apiClient from '../../../axiosInstance';
import { AuthContext } from '../../../contexts/AuthContext';
import Navbar from '../../../Pages/Shared/Navbar';
import Sidebar from '../../../Pages/Shared/Sidebar';
import BSidebar from '../../Shared/Bsidebar';
const Pickup = () => {
  const [parcels, setParcels] = useState([]);
  const [remarks, setRemarks] = useState({});
  const [accountBalance, setAccountBalance] = useState(0);
  const [balance, setBalance] = useState(0);
  const { user, token } = useContext(AuthContext);
  const [partialModal, setPartialModal] = useState({ isOpen: false, parcelId: null });
  const [partialPrice, setPartialPrice] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    const fetchParcels = async () => {
      try {
        if (user?.email) {
          let url = `/api/consignment`;
          const params = {
            status: "pickedup",
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
              Authorization: `Bearer ${token}`, // Ensure token is defined
            },
            params,
          });

          console.log("Fetched Delivered parcels:", response.data); // Add this line
          if (Array.isArray(response.data)) {
            const filteredParcels = response.data.filter((parcel) => parcel.status === "pickedup");
            setParcels(filteredParcels);
          }
        }
      } catch (error) {
        console.error('Error fetching parcels:', error);
      }
    };

    fetchParcels();
  }, [user, token, searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page for new search results
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user?.email) {
          const response = await apiClient.get(`/api/user/email/${user.email}`);
          setBalance(response.data.pendingBalance);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [user, accountBalance, parcels]);

  const deleveredParcel = async (parcelId, codAmount) => {
    try {
      const response = await apiClient.patch(`/api/consignment/${parcelId}/delivered`, {
        boyEmail: user.email,
      });

      setParcels(parcels.filter((parcel) => parcel._id !== parcelId));
      setAccountBalance(accountBalance + codAmount);

      Swal.fire({
        position: 'Top-center',
        icon: 'success',
        title: 'Delivered Successfully',
        showConfirmButton: false,
        timer: 1800,
      });
    } catch (error) {
      console.error('Error delivering parcel', error);
    }
  };
// partial delivery work system
  const handlePartialDelivery = async () => {
    if (partialPrice <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Partial Price',
        text: 'Please enter a valid partial price.',
      });
      return;
    }

    try {
      await apiClient.patch(
        `/api/consignment/${partialModal.parcelId}/partial-delivered`,
        { partialPrice, boyEmail: user.email, }
      );
      setParcels(parcels.filter((parcel) => parcel._id !== partialModal.parcelId));



      Swal.fire({
        position: 'Top-center',
        icon: 'success',
        title: 'Partially Delivered Successfully!',
        showConfirmButton: false,
        timer: 1800,
      });

      setPartialModal({ isOpen: false, parcelId: null });
      setPartialPrice(0);
    } catch (error) {
      console.error('Error in partial delivery:', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to Update Partial Delivery',
        text: error.message,
      });
    }
  };

  const handleRemarkChange = (parcelId, value) => {
    setRemarks((prevRemarks) => ({
      ...prevRemarks,
      [parcelId]: value,
    }));
  };

  const saveRemark = async (parcelId) => {
    try {
      const remark = remarks[parcelId];
      await apiClient.patch(`/api/consignment/${parcelId}/remark`, { remark });

      setParcels(parcels.map((parcel) => (parcel._id === parcelId ? { ...parcel, remark } : parcel)));

      Swal.fire({
        icon: 'success',
        title: 'Remark saved successfully!',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error('Error saving remark', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to save remark',
        text: error.message,
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        {user && (
          <>
            {user.role === 'Admin' ? (
              <ASidebar />
            ) : user.role === 'Delivery Boy' ? (
              <BSidebar />
            ) : (
              <Sidebar />
            )}
          </>
        )}

        <div className="p-8 bg-gray-100 w-screen">
          <div className="flex items-center justify-between">
          <SectionTitle heading="Picked Parcels" searchTerm={searchTerm} handleSearch={handleSearch}></SectionTitle>
            <p className="lg:text-xl font-bold mb-6 text-red-600 text-xs">
              <span className="text-black">Pending Amount: </span>
              {balance} Tk
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-1 mb-2 text-xs lg:text-base">
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
            <div style={{ overflowX: "auto", whiteSpace: "nowrap", scrollbarWidth: "thin" }} className="w-full">
              <table className="table min-w-max prinable-level">
                <thead>
                  <tr>
                              <th className="py-0.5 px-4 text-center border-b">Parcel Id </th>
                              <th className="py-0.5 px-1 text-center border-b">Sender Name</th>
                              <th className="py-0.5 px-1 text-center border-b">Receiver Name</th>
                              <th className="py-0.5 px-1 text-center border-b">COD Amount</th>
                              <th className="py-0.5 px-1 text-center border-b">Status</th>
                              <th className="py-0.5 px-1 text-center border-b">Details</th>
                              {/* <th className="py-0.5 px-1 text-center border-b">Pickup Date</th> */}
                              {/* <th className="py-0.5 px-1 text-center border-b">Delivery Date</th> */}
                              <th className="py-0.5 px-1 text-center border-b">Boy Info.</th>
                              {
                                user?.email === "Delivery Boy"?( <th className='py-0.5 px-1 text center border-b'>Action</th>):null
                              }
                              {
                                user?.emil === "Delivery Boy"?( <th className='py-0.5 px-1 text center border-b'>Remarks</th>):null
                              }

                  </tr>
                </thead>
                <tbody>
                  {parcels.length > 0 ? (
                    parcels.map((parcel) => (
                      <tr key={parcel._id}>
                        <td className="py-0.5 px-4 text-center border-b">{parcel._id}</td>
                        <td className="py-0.5 px-1 text-center border-b">{parcel.sname}</td>
                        <td className="py-0.5 px-1 text-center border-b">{parcel.rname}</td>
                        <td className="py-0.5 px-1 text-center border-b">{parcel.codAmount}</td>
                        <td className="py-0.5 px-1 text-center border-b">{parcel.status}</td>
                        <td className="py-0.5 px-2 text-center border-b">
                          <Link to={`/userboard/con-unique/${parcel._id}`}>
                            <button className="bg-blue-600 text-white px-2 py-1 rounded">View</button>
                          </Link>
                        </td>
                        <td className="py-0.5 px-1 text-center border-b">{parcel.boyEmail}</td>
                        {user?.role === "Delivery Boy" && (
                          <td className="py-0.5 px-1 text-center border-b">
                            <select
                              className="bg-green-600 text-white py-1 px-0.5 rounded border-none"
                              onChange={(e) => {
                                if (e.target.value === 'partial-delivered') {
                                  setPartialModal({ isOpen: true, parcelId: parcel._id });
                                } else if (e.target.value === 'delivered') {
                                  deleveredParcel(parcel._id, parcel.codAmount);
                                }
                              }}
                            >
                              <option value="">Select Status</option>
                              <option value="delivered">Delivered</option>
                              <option value="partial-delivered">Partial Delivered</option>
                            </select>
                          </td>
                        )}
                        {user?.role === "Delivery Boy" && (
                          <td className="py-0.5 px-1 text-center border-b">
                            <textarea
                              className="textarea textarea-accent w-24 h-2"
                              placeholder="Remark"
                              value={remarks[parcel._id] || ''}
                              onChange={(e) => handleRemarkChange(parcel._id, e.target.value)}
                            />
                            <button
                              onClick={() => saveRemark(parcel._id)}
                              className="bg-blue-600 text-white px-2 py-1 rounded"
                            >
                              Save
                            </button>
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-4">
                        No pickedup parcels available.
                      </td>
                    </tr>
                  )}
                </tbody>

              </table>
            </div>
          </div>


          {/* Partial Delivery Modal */}
          {partialModal.isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded shadow-lg w-96">
                <h3 className="text-lg font-bold mb-4">Partial Delivery</h3>
                <label className="block mb-2">Enter Partial Price:</label>
                <input
                  type="number"
                  className="w-full border px-3 py-0.5 rounded mb-4"
                  value={partialPrice}
                  onChange={(e) => setPartialPrice(Number(e.target.value))}
                />
                <div className="flex justify-end space-x-4">
                  <button
                    className="bg-gray-300 px-4 py-0.5 rounded"
                    onClick={() => setPartialModal({ isOpen: false, parcelId: null })}
                  >
                    Cancel
                  </button>
                  <button className="bg-blue-600 text-white px-4 py-0.5 rounded" onClick={handlePartialDelivery}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Pickup;

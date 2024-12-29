import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import ASidebar from '../../Admin_Panel/Shared/Asidebar';
import { AuthContext } from '../../contexts/AuthContext';
import Navbar from '../Shared/Navbar';
import Sidebar from '../Shared/Sidebar';

const ApprovalParcel = () => {
  const [parcels, setParcels] = useState([]);
  const { user, token } = useContext(AuthContext);
  const [riders, setRiders] = useState([]); // Correct way to use useState
  const [selectedRiders, setSelectedRiders] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRiders, setFilteredRiders] = useState([]);


  import apiClient from '../../axiosInstance';
  useEffect(() => {
    const fetchParcels = async () => {
      try {
        if(user?.email){
        const response = await apiClient.get(`/api/consignment?status=approved&userEmail=${user.email}&role=${user.role}`);
        console.log('Fetched Approval parcels:', response);
        if (Array.isArray(response.data)) {
          setParcels(response.data);  // Ensure it's an array
        } else {
          console.error('Unexpected response format:', response.data);
        }
      }
      // } else {
      //   console.error('Unexpected response format:', response.data);
      // }
      } catch (error) {
        console.error('Error fetching parcels', error);
      }
    };

    fetchParcels(); // Fetch parcels when the component mounts
}, [user]); // Run only once on component mount

  // fetch Rider/Delivery Boy by role.....
  // useEffect(() => {
  //   const fetchDeliveryBoys = async () => {
  //     try {
  //       const response = await apiClient.get('/api/user/roleby/role', {
  //         params: { role: 'Delivery Boy' },
  //       });
  //       setRiders(response.data);
  //     } catch (err) {
  //       setError(err.response?.data?.message || 'Error fetching delivery boys');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchDeliveryBoys();
  // }, []);
  useEffect(() => {
    const fetchFilteredRiders = async () => {
      try {

        const response = await apiClient.get('/api/user/roleby/role', {
          params: { role: 'Delivery Boy', boy: searchTerm },

        });
        setFilteredRiders(response.data);
      } catch (error) {
        console.error('Error fetching filtered riders:', error);
      }
    };

    if (searchTerm) {
      fetchFilteredRiders();
    } else {
      setFilteredRiders(riders); // Show all riders if search term is empty
    }
  }, [searchTerm, riders, user?.role, user?.email]);

// rider chang on dropdown....
  const handleRiderChange = (parcelId, riderId) => {
    // Update selected rider for a specific parcel
    setSelectedRiders((prev) => ({
      ...prev,
      [parcelId]: riderId,
    }));
  };


  // asigned and submitt ... rider
  const handleSubmit = async (parcelId) => {
    const selectedRiderId = selectedRiders[parcelId]; // Get the selected rider's ID

    if (!selectedRiderId) {
      alert('Please select a delivery boy!');
      return;
    }

    try {
      const response = await apiClient.patch('/api/assign-rider', {
        consignmentId: parcelId,
        riderId: selectedRiderId,
      });

      console.log('Parcel Assigned:', response.data);
      setParcels(parcels.filter(parcel => parcel._id !== parcelId)); // Remove the assigned parcel from the list
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Successfully Assigned Rider for this Parcel",
        showConfirmButton: false,
        timer: 1800
      });
    } catch (error) {
      console.error('Error updating consignment:', error);
      alert('Failed to update consignment.');
    }
  };



  return (
    <>
        <Navbar></Navbar>
        <div className="flex">
        {
          user?.role === "Admin"?<ASidebar></ASidebar>:<Sidebar></Sidebar>
        }
            <div className="p-8 bg-gray-100 w-screen">
                <h2 className="text-xl font-bold mb-6">Approval Parcels</h2>

                <div className="flex items-center gap-2 mb-4 ">
                  <Link to='/userboard/con-details'><button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">All</button></Link>
                  <Link to='/adminboard/pending'><button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">Pending</button></Link>
                  <Link to='/userboard/approval'><button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">Approved</button></Link>
                  {/* <Link to="#" onClick={ fetchParcels }>
                    <button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">
                      Approved
                    </button>
                  </Link> */}
                  <Link to='/boyboard/delevered'><button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">Deliverd</button></Link>
                  <Link to='/userboard/reject'><button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">Cancelled</button></Link>
                  <Link to='/boyboard/asign'><button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">Asigned Parcel</button></Link>
                  <Link to='/boyboard/pickup'><button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">Pickedup</button></Link>
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
                        <th className="py-0.5 px-4 text-left border-b">Pickup Date</th>
                        <th className="py-0.5 px-4 text-left border-b">Delivery Date</th>
                        <th className="py-0.5 px-4 text-center border-b">Details</th>
                        <th className="py-0.5 px-4 text-center border-b">Delivery Boy</th>
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
                            <td className='py-0.5 px-4 text-left border-b'>{new Date(parcel.pickupDate).toLocaleDateString('en-GB')}</td>
                            <td className='py-0.5 px-4 text-left border-b'>{new Date(parcel.deliveryDate).toLocaleDateString('en-GB')}</td>
                            <td className="py-0.5 px-2 text-center border-b"><Link to={`/userboard/con-unique/${parcel._id}`}><button className="bg-blue-600 text-white px-2 py-1 rounded">Views</button></Link></td>

                            <td className="py-0.5 px-4 text-center border-b">
                              <input
                                type="text"
                                className="border px-2 py-1 rounded mb-2"
                                placeholder="Search Delivery Boy"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                              />
                              <select
                                className="border px-2 py-1 rounded"
                                value={selectedRiders[parcel._id] || ''}
                                onChange={(e) => handleRiderChange(parcel._id, e.target.value)}
                              >
                                {/* <option value="" disabled>
                                  Select Delivery Boy
                                </option> */}
                                {(searchTerm ? filteredRiders : riders).map((boy) => (
                                  <option key={boy._id} value={boy._id}>
                                    {boy.name}
                                  </option>
                                ))}
                              </select>
                              <button
                                onClick={() => handleSubmit(parcel._id)}
                                className="bg-green-500 text-white px-3 py-1 rounded ml-2"
                              >
                                Assign
                              </button>
                            </td>


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

export default ApprovalParcel;

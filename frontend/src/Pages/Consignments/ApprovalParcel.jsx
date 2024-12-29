import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import SectionTitle from "../../Admin_Panel/Pages/SectionTitle/SectionTitle";
import ASidebar from "../../Admin_Panel/Shared/Asidebar";
import apiClient from '../../axiosInstance';
import { AuthContext } from "../../contexts/AuthContext";
import Navbar from "../Shared/Navbar";
import Sidebar from "../Shared/Sidebar";

const ApprovalParcel = () => {
  const [parcels, setParcels] = useState([]);
  const { user } = useContext(AuthContext);
  const [riders, setRiders] = useState([]); // Store all riders
  const [filteredRiders, setFilteredRiders] = useState({});
  const [selectedRiders, setSelectedRiders] = useState({});
  const [searchTerms, setSearchTerms] = useState({});
  const [searchTerm, setSearchTerm] = useState('');// Store search term for each parcel

  // Fetch parcels
useEffect(() => {
  const fetchParcels = async () => {
    try {
      if (user?.email) {
        // Call API
        const response = await apiClient.get(`/api/consignment`, {
          params: {
            parcel: searchTerm, // Search term
            status: "approved", // Ensure we only fetch "in review" parcels
            userEmail: user.email,
            role: user.role,
          },
        });

        console.log('Fetched Approval parcels:', response);

        // Validate response and update state
        if (response.data && Array.isArray(response.data)) {
          const filteredParcels = response.data.filter(parcel => parcel.status === "approved");
          setParcels(filteredParcels); // Update state with filtered parcels
        } else {
          console.error('Unexpected response format:', response.data);
        }

      } else {
        console.warn('User email is not defined');
      }
    } catch (error) {
      console.error("Error fetching parcels", error);
    }
  };

  fetchParcels();
}, [user, searchTerm]);


  // Fetch all delivery boys
  // useEffect(() => {
  //   const fetchRiders = async () => {
  //     try {
  //       const response = await apiClient.get("/api/user/roleby/role", {
  //         params: { role: "Delivery Boy" },
  //       });
  //       setRiders(response.data);
  //     } catch (error) {
  //       console.error("Error fetching riders", error);
  //     }
  //   };

  //   fetchRiders();
  // }, []);

  // Dynamically fetch filtered riders based on search term
  useEffect(() => {

    const fetchFilteredRiders = async () => {
      const results = {};

      await Promise.all(
        parcels.map(async (parcel) => {
          const searchTerm = searchTerms[parcel._id];
          if (searchTerm) {
            try {
              const response = await apiClient.get("/api/user/roleby/role", {
                params: { role: "Delivery Boy", boy: searchTerm },
              });
              results[parcel._id] = response.data;
            } catch (error) {
              console.error("Error fetching filtered riders:", error);
              results[parcel._id] = [];
            }

          } else {
            results[parcel._id] = riders; // Default to all riders
          }
        })
      );

      setFilteredRiders(results);
    };

    fetchFilteredRiders();
  }, [searchTerms, parcels, riders]);

  // Update selected rider for a parcel
  const handleRiderChange = (parcelId, riderId) => {
    setSelectedRiders((prev) => ({
      ...prev,
      [parcelId]: riderId,
    }));
  };

  // Update search term for a specific parcel
  const handleSearchChange = (parcelId, value) => {
    setSearchTerms((prev) => ({
      ...prev,
      [parcelId]: value,
    }));
  };

  // Assign a rider to a parcel
  const handleSubmit = async (parcelId) => {
    const selectedRiderId = selectedRiders[parcelId];
    if (!selectedRiderId) {
      alert("Please select a delivery boy!");
      return;
    }

    try {

      const response = await apiClient.patch('/api/assign-rider', {

        consignmentId: parcelId,
        riderId: selectedRiderId,
      });

      setParcels(parcels.filter((parcel) => parcel._id !== parcelId)); // Remove assigned parcel
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Successfully Assigned Rider for this Parcel",
        showConfirmButton: false,
        timer: 1800,
      });
    } catch (error) {
      console.error("Error assigning rider:", error);
      alert("Failed to assign rider.");
    }
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page for new search results
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        {user?.role === "Admin" ? <ASidebar /> : <Sidebar />}
        <div className="p-8 bg-gray-100 w-screen">
        <SectionTitle heading="Approval Parcels" searchTerm={searchTerm} handleSearch={handleSearch}></SectionTitle>

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
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="py-0.5 px-4 text-center border-b">Parcel Id </th>
                  <th className="py-0.5 px-4 text-center border-b">Sender Name</th>
                  <th className="py-0.5 px-4 text-center border-b">Receiver Name</th>
                  <th className="py-0.5 px-4 text-center border-b">COD Amount</th>
                  <th className="py-0.5 px-4 text-center border-b">Status</th>
                  <th className="py-0.5 px-4 text-left border-b">Pickup Date</th>
                  <th className="py-0.5 px-4 text-left border-b">Delivery Boy</th>
                </tr>
              </thead>
              <tbody>
                {parcels.map((parcel) => (
                  <tr key={parcel._id} className="border-t">
                    <td className="py-0.5 px-4 text-center">{parcel._id}</td>
                    <td className="py-0.5 px-4 text-center">{parcel.sname}</td>
                    <td className="py-0.5 px-4 text-center">{parcel.rname}</td>
                    <td className="py-0.5 px-4 text-center">{parcel.codAmount}</td>
                    <td className="py-0.5 px-4 text-center">
                      <span className="px-2 py-1 rounded-lg bg-green-800 text-white">
                        {parcel.status}
                      </span>
                    </td>
                    <td className="py-0.5 px-4 text-left">
                      {new Date(parcel.pickupDate).toLocaleDateString()}
                    </td>
                    <td className="py-0.5 px-4 text-center">
                      <input
                        type="text"
                        className="border px-2 py-1 rounded mb-2 w-full"
                        placeholder="Search Delivery Boy"
                        value={searchTerms[parcel._id] || ""}
                        onChange={(e) => handleSearchChange(parcel._id, e.target.value)}
                      />
                      <select
                        className="border px-2 py-1 rounded w-full"
                        value={selectedRiders[parcel._id] || ""}
                        onChange={(e) => handleRiderChange(parcel._id, e.target.value)}
                      >
                        <option value="" disabled>
                          Select Delivery Boy
                        </option>
                        {(filteredRiders[parcel._id] || riders).map((rider) => (
                          <option key={rider._id} value={rider._id}>
                            {rider.name}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleSubmit(parcel._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded mt-2 w-full"
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
                {parcels.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No Approval Parcels Available.
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

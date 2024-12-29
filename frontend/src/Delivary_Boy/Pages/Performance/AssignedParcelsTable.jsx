import React, { useState, useEffect, useContext } from "react";
import apiClient from "../../../axiosInstance";
import { AuthContext } from "../../../contexts/AuthContext"; // Access user context

function AssignedParcelsTable() {
  const [assignedParcels, setAssignedParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext); // Access user from AuthContext

  useEffect(() => {
    const fetchAssignedParcels = async () => {
        try {
          if (user?.email) {
            const response = await apiClient.get(
              `/api/consignment?status=asigned&role=Delivery%20Boy&boyEmail=${user.email}`
            );
      
            console.log("API Response:", response.data); // Debugging response
      
            if (response.data.success) {
              setAssignedParcels(response.data.parcels || []); // Set parcels data
            } else {
              console.error("API did not return success:", response.data.message);
            }
          }
        } catch (error) {
          console.error(
            "Error fetching assigned parcels:",
            error.response?.data || error.message
          );
        } finally {
          setLoading(false); // Stop loading spinner
        }
      };
      

    fetchAssignedParcels();
  }, [user?.email]);

  if (loading) {
    return <p className="text-center">Loading assigned parcels...</p>;
  }

  if (assignedParcels.length === 0) {
    return <p className="text-center">No assigned parcels found.</p>;
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Assigned Parcels</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Parcel ID</th>
              <th className="border border-gray-300 px-4 py-2">Recipient</th>
              <th className="border border-gray-300 px-4 py-2">Address</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {assignedParcels.map((parcel) => (
              <tr key={parcel.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{parcel.id}</td>
                <td className="border border-gray-300 px-4 py-2">{parcel.recipient}</td>
                <td className="border border-gray-300 px-4 py-2">{parcel.address}</td>
                <td className="border border-gray-300 px-4 py-2">{parcel.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AssignedParcelsTable;

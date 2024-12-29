import React, { useEffect, useState, useContext } from "react";
import Navbar from "../../../Pages/Shared/Navbar";
import BSidebar from "../../Shared/Bsidebar";
import apiClient from "../../../axiosInstance";
import { AuthContext } from "../../../contexts/AuthContext"; // Import AuthContext to access user info
import AssignedParcelsTable from "./AssignedParcelsTable";

function Performance() {
  const [performanceData, setPerformanceData] = useState({
    assignedParcels: 0,
    deliveredParcels: 0,
    totalCodAmount: 0,
  });

  const { user } = useContext(AuthContext); // Access user from AuthContext

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        if (user?.email) {
          // Fetch Delivered Parcels
          const responseDelivered = await apiClient.get(
            `/api/consignment/total/boydelivered/${user.email}`
          );

          if (responseDelivered.data.success) {
            setPerformanceData((prevData) => ({
              ...prevData,
              deliveredParcels: responseDelivered.data.totalDelivered,
            }));
          }

          // Fetch Assigned Parcels and Total COD Amount if APIs are available
          // Example placeholder for other data fetching
          const assignedResponse = await apiClient.get(
            `/api/consignment/total/assigned/${user.email}`
          );
          const codResponse = await apiClient.get(
            `/api/consignment/total/cod/${user.email}`
          );

          if (assignedResponse.data.success && codResponse.data.success) {
            setPerformanceData((prevData) => ({
              ...prevData,
              assignedParcels: assignedResponse.data.totalAssigned,
              totalCodAmount: codResponse.data.totalCodAmount,
            }));
          }
        }
      } catch (error) {
        console.error(
          "Error fetching performance data:",
          error.response?.data || error.message
        );
      }
    };

    fetchPerformanceData();
  }, [user?.email]);

  return (
    <div>
      <Navbar />
      <div className="lg:flex bg-gray-100 min-h-screen">
        <BSidebar />
        <div className="flex-1 p-4">
          <h1 className="text-2xl font-bold mb-4">Delivery Boy Performance</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <h2 className="text-lg font-medium text-gray-600">
                Assigned Parcels
              </h2>
              <p className="text-2xl font-bold text-gray-800">
                {performanceData.assignedParcels}
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <h2 className="text-lg font-medium text-gray-600">
                Delivered Parcels
              </h2>
              <p className="text-2xl font-bold text-gray-800">
                {performanceData.deliveredParcels}
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <h2 className="text-lg font-medium text-gray-600">
                Total COD Amount
              </h2>
              <p className="text-2xl font-bold text-gray-800">
                ৳{performanceData.totalCodAmount.toLocaleString("en-BD")}
              </p>
            </div>
          </div>
          <AssignedParcelsTable />
        </div>
      </div>
    </div>
  );
}

export default Performance;

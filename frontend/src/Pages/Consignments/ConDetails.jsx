import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import ASidebar from "../../Admin_Panel/Shared/Asidebar";
import apiClient from '../../axiosInstance';
import { AuthContext } from "../../contexts/AuthContext";
import BSidebar from "../../Delivary_Boy/Shared/Bsidebar";
import ParcelStatusStepper from "../Parcel/tracker/ParcelStatusStepper";
import Navbar from "../Shared/Navbar";
import Sidebar from "../Shared/Sidebar";

const ConDetails = () => {
  const { user, token } = useContext(AuthContext);
  const { id } = useParams(); //
  const [parcelData, setParcelData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from backend
    apiClient
      .get(`/api/consignment/${id}`)
      .then((response) => {
        setParcelData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching parcel data:", error);
      });
  }, []);

  if (!parcelData) {
    return <div>Loading...</div>;
  }

  // Express Delivery Status
  const  expressDelivery = async (parcelId) => {
    try {
      const response = await apiClient.patch(`/api/consignment/${parcelId}/express`);
      console.log('Delivery Status Express:', response.data);
      setParcelData(response.data)
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "  Parcel Successfully set for Express Delivery",
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error('Error express Delivery for  parcel', error);
    }
  };

  // Regular Delivery Status
  const regularDelivery = async (parcelId) =>{
    try {
      const response = await apiClient.patch(`/api/consignment/${parcelId}/regular`);
      console.log('regular DeliveryStatus :', response.data);
      setParcelData(response.data)
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "  Parcel Successfully set for Regular Delivery",
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error('Error regular Delivery for  parcel', error);
    }
    
  };


  const handleDeliveryAction = ()=>{

    if(user?.role === 'Admin'){
      return <>
            <button className="bg-gray-500 hover:bg-gray-700 text-white px-2 py-1 rounded" onClick={() => regularDelivery(parcelData._id)}>
              Regular
            </button>
            <button className="bg-purple-500 hover:bg-purple-700 text-white px-2 py-1 rounded" onClick={() => expressDelivery(parcelData._id)}>
              Express Delivery
            </button>
      </>
    }
    else if( user?.role === 'Marchant'){
      return <>
          <button className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded">
              {parcelData.dtype==='regular'?"24 Hours Delivery":"Express Delivery"}
          </button>
      </>
    }
  }

  // Delete data from table based on Id
  const handleDelete = async (_id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await apiClient.delete(`/api/consignment/${_id}`);
        Swal.fire("Deleted!", "Your consignment has been deleted.", "success");
        navigate("/userboard/con-details");
      } catch (error) {
        console.error("Error deleting parcel:", error);
        Swal.fire(
          "Error!",
          "Failed to delete the parcel. Please try again.",
          "error"
        );
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        {user ? (
          <>
            {user?.role === "Admin" ? (
              <ASidebar /> // Renders the Admin Sidebar
            ) : user?.role === "Delivery Boy" ? (
              <BSidebar /> // Renders the Delivery Boy Sidebar
            ) : (
              <Sidebar /> // Default Sidebar for other users
            )}
          </>
        ) : null}


        <div className="bg-gray-100 w-3/5 p-5">
          <div className="mb-8 text-start font-semibold text-xl"></div>


          <div className="p-6 bg-white shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">
                Open Support Ticket
              </button>
              <Link to={`/userboard/invoice/${id}`}>
                <button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">
                  Invoice
                </button>
              </Link>
              <Link to={`/userboard/label/${id}`}>
                <button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">
                  Level
                </button>
              </Link>
              {user?.role === "Admin" && (
                <Link to={`/userboard/updateparcel/${id}`}>
                  <button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">
                    Edit
                  </button>
                </Link>
              )}
            </div>
            <div className="border p-6">
              <div className="flex justify-between items-start">
                <div className="text-gray-500">
                  <p className="text-gray-500">
                    {new Date(parcelData.createdAt).toLocaleString()}
                  </p>
                  <p>Id: {parcelData._id}</p>
                  <p>Invoice: {parcelData.invoice}</p>
                  <p>Delivery Status: <span className="text-amber-300">{parcelData.deliveryStatus}</span></p>
                  <p>Tracking Code: {parcelData.trackingCode}</p>
                  <p>
                    Tracking Link:{" "}
                    <a href={parcelData.trackingLink} className="text-blue-500">
                      {parcelData.trackingLink}
                    </a>
                  </p>

                  {/* New Buttons Below the Tracking Link */}
                  <div className="mt-4 flex gap-4">
                    {handleDeliveryAction()}
                  </div>
                </div>

                <div>
                  <p className="text-gray-500">
                    Created at:{" "}
                    {new Date(parcelData.createdAt).toLocaleString()}
                  </p>
                  {parcelData.status === "approved" ? (
                    <p className="text-gray-500">Approved at: Yes</p>
                  ) : (
                    <p className="text-gray-500">Approved at: Not Yet </p>
                  )}
                  <p>
                    <span className="text-gray-500">Weight:</span>{" "}
                    {parcelData.weight || "KG"}
                  </p>
                  <p className="font-bold text-lg">COD: ৳ {parcelData.codAmount}</p>
                  <p className="text-green-400">{parcelData.status}</p>
                  <div className="mt-4 flex space-x-4">
                    {user?.role === 'Admin' && (parcelData.status === "approved" ||
                    parcelData.status === "asigned" ||
                    parcelData.status === "pickedup" ||
                    parcelData.status === "delevered" ? null : (
                      <button
                        onClick={() => handleDelete(parcelData._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Delete
                      </button>
                    ))}
                    {/* <p className="text-gray-500">{parcelData.status}</p> */}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <p>
                  <span className="font-semibold">Name:</span> {parcelData.rname}
                </p>
                <p>
                  <span className="font-semibold">Address: </span>
                  {parcelData.raddress}
                </p>
                <p>
                  <span className="font-semibold">Phone Number:</span>
                  {parcelData.rphone}
                  <a
                    href={`tel:${parcelData.rphone}`}
                    className="ml-2 text-white px-2 py-1 rounded-md border-0 bg-blue-500"
                  >
                    Call
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 w-2/5 p-5 ">
        <div className="mb-8 text-start font-semibold text-xl"></div>
          <div className="p-6 bg-white shadow-sm">
          <h1 className="font-bold mb-3">Parcel Status Tracker</h1>
          <ParcelStatusStepper currentStatus={parcelData} />
          </div>

        </div>
      </div>
    </>
  );
};

export default ConDetails;

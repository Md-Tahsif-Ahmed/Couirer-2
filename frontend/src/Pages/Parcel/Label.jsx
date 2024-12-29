import React, { useContext, useEffect, useState } from "react";
import Barcode from "react-barcode";
import QRCode from "react-qr-code";
import { Link, useParams } from "react-router-dom";
import ASidebar from "../../Admin_Panel/Shared/Asidebar";
import logo from "../../assets/Tspeed.jpg";
import apiClient from '../../axiosInstance';
import { AuthContext } from "../../contexts/AuthContext";
import BSidebar from "../../Delivary_Boy/Shared/Bsidebar";
import Navbar from "../Shared/Navbar";
import Sidebar from "../Shared/Sidebar";
const Label = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams(); // Get parcel ID from route parameters
  const [parcelData, setParcelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParcelData = async () => {
      try {
        const response = await apiClient.get(
          `/api/consignment/${id}`
        );
        setParcelData(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching parcel data");
        setLoading(false);
      }
    };

    if (id) {
      fetchParcelData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  if (!parcelData) {
    return (
      <div className="flex justify-center items-center h-screen">
        No parcel data found.
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex">
        {user && (
          <>
            {user?.role === "Admin" ? (
              <ASidebar />
            ) : user?.role === "Delivery Boy" ? (
              <BSidebar />
            ) : (
              <Sidebar />
            )}
          </>
        )}
        <div className="flex flex-col items-center p-6 bg-gray-100 w-full">
          {/* Parcel Header */}
          <div className="w-full flex flex-col md:flex-row justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Parcel ID# {parcelData._id}</h2>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to={`/userboard/invoice/${id}`}>
                <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
                  Invoice
                </button>
              </Link>
              <Link to={`/userboard/label/${id}`}>
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                  Label
                </button>
              </Link>
            </div>
          </div>

          {/* Label Container */}
          <div className="flex flex-col md:flex-row bg-white px-6 py-4 rounded-lg shadow-md w-full max-w-4xl">
            {/* Left: Parcel Info */}
            <div className="border p-4 w-full md:w-1/3 printable-label">
              <p className="text-center">
              <strong>Marchant ID:</strong> {parcelData.marchantId}
            </p>
              <div className="flex justify-center mb-4">
                <img src={logo} alt="Logo" className="h-16 w-auto" />
              </div>

              {/* Barcode */}
              <div className="flex justify-center mb-4">
                <Barcode value={parcelData._id} />
              </div>

              {/* QR Code & Details */}
              <div className="flex flex-col md:flex-row md:space-x-4 items-start mb-4">
                <div className="flex justify-center">
                  <QRCode value={`Parcel: ${parcelData._id}`} size={70} />
                </div>
                <div className="text-sm mt-4 md:mt-0">
                  <p>
                    <strong>ID:</strong> {parcelData._id}
                  </p>
                  <p>
                    <strong>D. Type:</strong> {parcelData.dtype}
                  </p>
                  <p>
                    <strong>Weight:</strong> {parcelData.weight}
                  </p>
                </div>
              </div>

              {/* Sender & Receiver Info */}
              <div className="border-t pt-4 text-sm space-y-2">
                <p>
                  <strong>Sender Name:</strong> {parcelData.sname}
                </p>
                <p>
                  <strong>Sender Phone:</strong> {parcelData.sphone}
                </p>
                <p>
                  <strong>Sender Address:</strong> {parcelData.saddress}
                </p>
                <hr className="my-2" />
                <p>
                  <strong>Receiver Name:</strong> {parcelData.rname}
                </p>
                <p>
                  <strong>Receiver Phone:</strong> {parcelData.rphone}
                </p>
                <p>
                  <strong>Receiver Address:</strong> {parcelData.raddress}
                </p>
                <hr className="my-2" />
                <p>
                  <strong>Top Speed Phone:</strong> 01765-044144
                </p>
                <hr className="my-2" />
              </div>

              {/* COD */}
              <div className="border-t pt-4 text-center text-lg font-bold">
                COD: {parcelData.codAmount}
              </div>

              {/* Footer */}
              <div className="mt-4 flex justify-between text-xs">
                {/* Left: Date and Time */}
                <div className="text-left">
                  <p>
                    {new Date(parcelData.createdAt).toLocaleDateString("en-GB")}
                  </p>
                  <p>
                    {new Date(parcelData.createdAt).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      }
                    )}
                  </p>
                </div>
                {/* Right: Courier Info */}
                <div className="text-right">
                  <p>
                    <strong>TopSpeed Courier Service Ltd.</strong>
                  </p>
                  <p>www.TopSpeedbd.com</p>
                </div>
              </div>
            </div>

            {/* Right: Print Button */}
            <div className="w-full md:w-2/3 flex justify-center items-start mt-6 md:mt-0">
              <button
                className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
                onClick={() => window.print()}
              >
                Print
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Label;

import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../../../contexts/AuthContext";
import ASidebar from "../../../Shared/Asidebar";
import Navbar from "../../../../Pages/Shared/Navbar";
import apiClient from "../../../../axiosInstance";
import ConInReview from "../../../../Pages/Consignments/ConInReview";

const ParcelReview = () => {
  const { email } = useParams(); // Get email from the route params
  const [currentUser, setCurrentUser] = useState(null); // User data state
  const [parcels, setParcels] = useState([]); // Parcels data state
  const [searchTerm, setSearchTerm] = useState('');
  const { user, token } = useContext(AuthContext);


  // Fetch user and parcel data
  useEffect(() => {
    // Fetch user details
    apiClient
      .get(`/api/user/email/${email}`)
      .then((response) => setCurrentUser(response.data))
      .catch((error) => console.error("Error fetching user details:", error));

    // Fetch parcels
    apiClient
      .get(`/api/consignment/by-email/${email}`, {
        params: { parcel: searchTerm }})
      .then((response) => setParcels(response.data))
      .catch((error) => console.error("Error fetching parcels:", error));
  }, [email, searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // setCurrentPage(1); // Reset to the first page for new search results
  };
  return (
    <div>
      <Navbar />
      <div className="flex space-x-4">
      { user ? (
          <>
            {user?.role === "Admin" ? (
              <ASidebar /> // Renders the Admin Sidebar
            ) : user?.role === "Delivery Boy" ? (
              <BSideba /> // Renders the Delivery Boy Sidebar
            ) : (
              <Sidebar /> // Default Sidebar for other users
            )}
          </>
        ) : (
          null // You can render something else here if no user is logged in
        )
      }
      <div className="flex bg-gray-100 min-h-screen">
        {/* Sidebar */}
        <aside className="w-1/5 bg-white shadow-lg p-4">
          <div className="text-center mb-6">
            <div className="rounded-full bg-gray-200 w-24 h-24 mx-auto mb-4"></div>

            {/* Display user details dynamically */}
            {user ? (
              <>
                <h3 className="text-lg font-bold">{currentUser?.name}</h3>
                <p className="text-gray-600">{currentUser?.address}</p>
                <button className="text-blue-500 text-sm">Change</button>
              </>
            ) : (
              <p>Loading user details...</p>
            )}
          </div>
          <ul className="space-y-4">
            <li>
              <button className="text-green-600 font-semibold w-full text-left">
                Dashboard
              </button>
            </li>
            <li>
              <button className="text-gray-600 w-full text-left">
                Fleet Management
              </button>
            </li>
            <li>
              <button className="text-gray-600 w-full text-left">My Hub</button>
            </li>
            <li>
              <button className="text-gray-600 w-full text-left">
                Add Parcel
              </button>
            </li>
            <li>
              <button className="text-gray-600 w-full text-left">
                Approve Parcel
              </button>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Cards Section */}
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-blue-100 p-6 rounded-lg">
              <h2 className="text-lg font-semibold">Current Balance</h2>
              <button className="text-blue-500 font-semibold mt-2">
                Check Balance
              </button>
            </div>
            <div className="bg-orange-100 p-6 rounded-lg">
              <h2 className="text-lg font-semibold">Pending Parcel</h2>
              <p className="text-2xl font-bold">50000</p>
            </div>
            <div className="bg-pink-100 p-6 rounded-lg">
              <h2 className="text-lg font-semibold">Return List</h2>
              <button className="text-pink-500 font-semibold mt-2">
                Create
              </button>
            </div>
          </div>

          {/* Payment Details Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 mt-8">
            <div className="grid grid-cols-3 gap-3">
              {/* Column 1 */}
              <div>
                <p className="text-gray-800">
                  Payment Status:{" "}
                  <span className="bg-green-500 text-white px-2 py-1 rounded">
                    Normal
                  </span>
                </p>
                <p className="mt-2 text-gray-800">
                  Nearest Zone:{" "}
                  <span className="text-green-500 font-medium">Dhanmondi</span>
                </p>
               <Link to="/userboard/fileup"><button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">
                  Bulk Entry
                </button></Link>
              </div>

              {/* Column 2 */}
              {/* <div>
                <p className="text-gray-800">
                  Default Withdrawal Method:{" "}
                  <span className="text-green-500 font-medium">Bank</span>
                </p>
                <p className="mt-2 text-gray-800">
                  Default Withdrawal Method:{" "}
                  <span className="text-green-500 font-medium">Bank</span>
                </p>
                <button className="bg-gray-600 text-white px-4 py-2 mt-4 rounded">
                  Data Entry
                </button>
              </div> */}

              {/* Column 3 */}
              <div className="flex">
                {/* <p className="text-gray-800">
                  Bank A/C No.:{" "}
                  <span className="text-green-500 font-medium">
                    251354987321
                  </span>
                </p> */}
                <p className=" text-gray-800">
                  COD Charge:<span className="text-green-500 font-medium">{"1%"}</span>
                </p>
                <div className=" flex-col justify-between gap-2">
                  <span className=" text-red-400  ">
                    Irregular
                  </span>
                  <button className="text-blue-500 font-medium">Change</button>
                </div>
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="mt-6">
          {/* <UserConsignment parcels={parcels} handleSearch={handleSearch} searchTerm={searchTerm} /> */}
              <ConInReview></ConInReview>
          </div>

        </main>
      </div>
    </div>
    </div>
  );
};

export default ParcelReview;

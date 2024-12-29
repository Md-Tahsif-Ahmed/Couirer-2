import React, { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../Pagination";

const UserConsignment = ({ parcels, handleSearch, searchTerm }) => {
  const [currentPage, setCurrentPage] = useState(1); // Current active page
  const itemsPerPage = 10; // Number of items per page

  // Calculate indices for the current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Extract current page items
  const currentItems = parcels.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="bg-white p-4 shadow rounded">
      {/* Search bar */}
      <div className="flex justify-between mb-8">
        <h2 className="text-xl font-semibold">All Consignment</h2>
        <input
          type="text"
          placeholder="Search Consignment"
          value={searchTerm}
          onChange={handleSearch}
          className="border focus:outline-none px-4 py-0.5"
        />
      </div>

      {currentItems.length > 0 ? (
        <>
          {/* Parcel table */}
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
              <th className="py-0.5 px-2 text-center border-b">Product Id</th>
                {/* <th className="py-0.5 px-2 text-center border-b">Sender Name</th> */}
                <th className="py-0.5 px-2 text-center border-b">Receiver Name</th>
                <th className="py-0.5 px-2 text-center border-b">Receiver Mobile</th>
                <th className="py-0.5 px-2 text-center border-b">COD Amount</th>
                <th className="py-0.5 px-2 text-center border-b">Status</th>
                <th className="py-0.5 px-2 text-center border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Render current items only */}
              {currentItems.map((parcel) => (
                <tr key={parcel._id} className="border-t">
                   <td className="py-0.5 px-2 text-center border-b">{parcel._id}</td>
                  <td className="py-0.5 px-2 text-center border-b">{parcel?.rname||''}</td>
                  <td className="py-0.5 px-2 text-center border-b">{parcel.rphone}</td>
                  <td className="py-0.5 px-2 text-center border-b">{parcel.codAmount}</td>
                  <td className="py-0.5 px-2 text-center border-b">
                    <span
                      className={`px-2 py-0.5 rounded-lg ${
                        parcel.status === "pending"
                          ? "bg-yellow-800 text-white"
                          : parcel.status === "approved"
                          ? "bg-green-800 text-white"
                          : parcel.status === "cancelled"
                          ? "bg-red-800 text-white"
                          : parcel.status === "asigned"
                          ? "bg-yellow-300 text-white"
                          : parcel.status === "pickedup"
                          ? "bg-purple-500 text-white"
                          : parcel.status === "delivered"
                          ? "bg-rose-700 text-white"
                          : parcel.status === "deposited"
                          ? "bg-pink-900 text-white"
                          : parcel.status === "paid"
                          ? "bg-green-400 text-white"
                          : parcel.status === "partial-delivered"
                          ? "bg-yellow-200 text-white"
                          : parcel.status === "in review"
                          ? "bg-orange-500 text-white"
                          : ""
                      }`}
                    >
                      {parcel.status}
                    </span>
                  </td>
                  <td className="py-0.5 px-2 text-center border-b">
                    <Link to={`/userboard/con-unique/${parcel._id}`}>
                      <button className="bg-blue-600 text-white px-2 py-1 rounded">
                        Data Entry
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="mt-6 flex justify-center">
            <Pagination
              activePage={currentPage}
              totalPages={Math.ceil(parcels.length / itemsPerPage)}
              onChange={(page) => setCurrentPage(page)}
            />
          </div>
        </>
      ) : (
        <p>No parcels found for this email.</p>
      )}
    </div>
  );
};

export default UserConsignment;

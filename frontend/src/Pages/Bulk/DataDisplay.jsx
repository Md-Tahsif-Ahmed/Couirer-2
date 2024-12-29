import React, { useEffect, useState } from 'react';
import Pagination from '../../Pagination';
import '../Parcel/label.css';
import Navbar from '../Shared/Navbar';
import Sidebar from '../Shared/Sidebar';

import apiClient from '../../axiosInstance';
const DataDisplay = () => {
  const [consignments, setConsignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Current active page
  const itemsPerPage = 5; // Number of items per page

  useEffect(() => {
    // Fetch data from the backend
    const fetchConsignments = async () => {
      try {
        const response = await apiClient.get('/api/consignment');
        setConsignments(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching consignments');
        setLoading(false);
      }
    };

    fetchConsignments();
  }, []);

  // Calculate the paginated data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = consignments.slice(indexOfFirstItem, indexOfLastItem);

  if (loading) {
    return <div>Loading data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="bg-gray-100 p-10">
          <div className="mb-8 text-end">
            <button
              onClick={() => window.print()}
              className="bg-green-500 text-white py-1 px-12 rounded hover:bg-green-600 mt-4"
            >
              Print
            </button>
          </div>
          <div className="p-8 bg-white shadow-sm">
            <h2 className="text-xl mb-4 text-center font-bold">Imported Consignment ({consignments.length})</h2>
            <table className="min-w-full printable-label">
              <thead>
                <tr>
                  <th className="py-2">Id</th>
                  <th className="py-2">Invoice</th>
                  <th className="py-2">Delivary Type</th>
                  <th className="py-2">Sender Name</th>
                  <th className="py-2">Reciever Name</th>
                  <th className="py-2">Cod Amount</th>
                  <th className="py-2">Weight</th>
                  <th className="py-2">S.Address</th>
                  <th className="py-2">R.Address</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((row, index) => (
                    <tr key={index} className="border-t">
                      <td className="py-2">{row._id}</td>
                      <td className="py-2">{row.invoice}</td>
                      <td className="py-2">{row.dtype}</td>
                      <td className="py-2">{row.sname}</td>
                      <td className="py-2">{row.rname}</td>
                      <td className="py-2">{row.codAmount}</td>
                      <td className="py-2">{row.weight}</td>
                      <td className="py-2">{row.saddress}</td>
                      <td className="py-2">{row.raddress}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-4">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="mt-6 flex justify-center">
              <Pagination
                activePage={currentPage}
                totalPages={Math.ceil(consignments.length / itemsPerPage)}
                onChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataDisplay;

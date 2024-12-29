import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Pagination from '../../Pagination'; // If you have a Pagination component
import apiClient from '../../axiosInstance';
import { AuthContext } from '../../contexts/AuthContext';
import Navbar from '../Shared/Navbar';
import Sidebar from '../Shared/Sidebar';
const HistoryDisplay = () => {
  const { email } = useParams();
  const { user, token, loading: authLoading } = useContext(AuthContext); // Destructure loading as authLoading
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Adjust the number of items per page as needed

  // Fetch parcels by email
  useEffect(() => {
    const fetchParcels = async () => {
      if (authLoading) {
        return; // Wait until loading is false
      }

      if (!user || !token) {
        // If the user is not authenticated, handle redirect or error appropriately
        setLoading(false);
        return;
      }

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await apiClient.get(`/api/parcels/by-email/${email}`, config);
        setParcels(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching parcels:', err);
        setError('Failed to fetch parcel history');
        setLoading(false);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to fetch your parcel history.',
          icon: 'error',
          confirmButtonText: 'Okay',
        });
      }
    };

    fetchParcels();
  }, [authLoading, user, token, email]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = parcels.slice(indexOfFirstItem, indexOfLastItem);

  if (loading) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-grow flex items-center justify-center">
          <p>Loading your parcel history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-grow flex items-center justify-center">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="my-16 p-6 w-full">
          <h1 className="text-center font-semibold text-4xl mb-8">Your Parcel History</h1>
          {parcels.length === 0 ? (
            <p className="text-center">You have not added any parcels yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full printable-label">
                <thead>
                  <tr>
                    <th className="py-2">Id</th>
                    <th className="py-2">Invoice</th>
                    <th className="py-2">Delivery Type</th>
                    <th className="py-2">Sender Name</th>
                    <th className="py-2">Receiver Name</th>
                    <th className="py-2">Cod Amount</th>
                    <th className="py-2">Weight</th>
                    <th className="py-2">S.Address</th>
                    <th className="py-2">R.Address</th>
                    <th className="py-2">Details</th>
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
                        <td className="py-2">
                          <Link to={`/userboard/con-unique/${row._id}`}>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded">View</button>
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" className="text-center py-4">
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
                  totalPages={Math.ceil(parcels.length / itemsPerPage)}
                  onChange={(page) => setCurrentPage(page)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HistoryDisplay;

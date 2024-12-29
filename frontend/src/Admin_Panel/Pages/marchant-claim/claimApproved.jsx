import React, { useContext, useEffect, useState } from 'react';
import apiClient from '../../../axiosInstance';
import { AuthContext } from '../../../contexts/AuthContext';
import BSidebar from '../../../Delivary_Boy/Shared/Bsidebar';
import Navbar from '../../../Pages/Shared/Navbar';
import Sidebar from '../../../Pages/Shared/Sidebar';
import ASidebar from '../../Shared/Asidebar';
function ClaimApproved() {
  const { user } = useContext(AuthContext);

  // Static data for now
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    const fetchclaims = async () => {
      try {
        console.log('User:', user);  // Log the user object to see if it's available
        if (user?.email) {  // Ensure user is logged in and email is available
          const response = await apiClient.get(`/api/claim?status=approved&userEmail=${user?.email}&role=${user.role}`);
          console.log('Fetched pending claims:', response);
          if (Array.isArray(response.data)) {
            setClaims(response.data);  // Ensure it's an array
          } else {
            console.error('Unexpected response format:', response.data);
          }
        } else {
          console.error('User is not logged in or user email is undefined');
        }
      } catch (error) {
        console.error('Error fetching claims', error);
      }
    };

    fetchclaims();
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="flex">
        {user ? (
          <>
            {user.role === 'Admin' ? (
              <ASidebar />
            ) : user.role === 'Delivery Boy' ? (
              <BSidebar />
            ) : (
              <Sidebar />
            )}
          </>
        ) : null}
        <div className="p-6 w-full">
          <h2 className="lg:text-2xl text-sm font-bold mb-4">Merchant Approval Claims </h2>
          <div className="bg-white shadow-sm p-8">
              {/* Ensure horizontal scrolling */}
              <div style={{ overflowX: "auto", whiteSpace: "nowrap", scrollbarWidth: "thin" }} className="w-full">
                <table className="table min-w-max border-collapse">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-center">Merchant Info</th>
                      <th className="px-4 py-2 text-center">Amount</th>
                      <th className="px-4 py-2 text-center">Date</th>
                      <th className="px-4 py-2 text-center">Time</th>
                      <th className="px-4 py-2 text-center">Status</th>

                    </tr>
                  </thead>
                  <tbody>
                    {claims.map((claim) => (
                      <tr key={claim._id} className="text-center border-t">
                        <td className="px-4 py-2 text-center">{claim.userEmail}</td>
                        <td className="px-4 py-2 text-center">{claim.claimAmount}</td>
                        <td className="px-4 py-2 text-center">{new Date(claim.createdAt).toLocaleDateString()}</td>
                        <td className="px-4 py-2 text-center">{new Date(claim.createdAt).toLocaleTimeString()}</td>
                        <td className="px-4 py-2 text-center"><span className='px-2 py-1 rounded-lg bg-green-800 text-white'>{claim.status}</span></td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}

export default ClaimApproved;

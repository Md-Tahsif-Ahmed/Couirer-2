import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import BSidebar from '../../../Delivary_Boy/Shared/Bsidebar';
import Navbar from '../../../Pages/Shared/Navbar';
import Sidebar from '../../../Pages/Shared/Sidebar';
import apiClient from '../../../axiosInstance';
import { AuthContext } from '../../../contexts/AuthContext';
import ASidebar from '../../Shared/Asidebar';
const Marchantwise = () => {
    const [users, setUsers] = useState([]);
    const { user, token } = useContext(AuthContext);

    // Fetch user data based on role
    const fetchUserData = async () => {
        try {
            if (user?.email) {
                const response = await apiClient.get(`/api/user?role=Marchant`);
                setUsers(response.data);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [user]);

    // Pay to merchant and refetch if necessary
    const payParcel = async (userId, amount) => {
        try {
            await apiClient.post(
                '/api/user/paymarchant',
                { userId, amount },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            Swal.fire('Success', 'Payment processed successfully!', 'success');
            // Refetch users to update the table
            fetchUserData();
        } catch (error) {
            console.error('Error processing payment:', error);
            Swal.fire('Error', 'Unable to process payment', 'error');
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex">
                {user && (
                    <>
                        {user.role === "Admin" ? <ASidebar /> : user.role === "Delivery Boy" ? <BSidebar /> : <Sidebar />}
                    </>
                )}

                <div className="p-8 bg-gray-100 w-screen">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold mb-6">Marchant' Due</h2>
                    </div>
                    {user?.role !== "Delivery Boy" && (
                        <div className="flex items-center gap-2 mb-4">
                            {/* Filter Links */}
                            <Link to=''><button className="bg-green-500 px-3 py-1 text-white rounded-sm font-medium">All</button></Link>
                            {/* Add more filter links as needed */}
                        </div>
                    )}
                    <div className="bg-white shadow-sm p-8">
                         {/* Ensure horizontal scrolling */}
                        <div style={{ overflowX: "auto", whiteSpace: "nowrap", scrollbarWidth: "thin" }} className="w-full">
                            <table className="table min-w-max border-collapse">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 text-center border-b">Marchant Name</th>
                                    <th className="py-2 px-4 text-center border-b">Marchant Email</th>
                                    <th className="py-2 px-4 text-center border-b">Due</th>
                                    <th className="py-2 px-4 text-center border-b">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 ? (
                                    users
                                        .filter(user => user.sumDeposite !== 0) // Only show users with a non-zero sumDeposite
                                        .map(user => (
                                            <tr key={user._id} className="border-t">
                                                <td className="py-2 px-4 text-center border-b">{user.name}</td>
                                                <td className="py-2 px-4 text-center border-b">{user.email}</td>
                                                <td className="py-2 px-4 text-center border-b">{user.sumDeposite}</td>
                                                <td className="py-2 px-4 text-center border-b">
                                                    <button
                                                        className="bg-red-600 text-white py-1 px-2 rounded"
                                                        onClick={() => payParcel(user._id, user.sumDeposite)}
                                                    >
                                                        Pay to Merchant
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4">
                                            No balance available.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Marchantwise;

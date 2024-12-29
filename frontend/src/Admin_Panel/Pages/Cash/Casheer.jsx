import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import BSidebar from '../../../Delivary_Boy/Shared/Bsidebar';
import Navbar from '../../../Pages/Shared/Navbar';
import Sidebar from '../../../Pages/Shared/Sidebar';
import ASidebar from '../../Shared/Asidebar';

import apiClient from '../../../axiosInstance';
const Casheer = () => {

        const [balance, setBalance] = useState(0); // Initialize balance state
        const {user} = useContext(AuthContext);

        useEffect(() => {
            // Fetch the user data if email is available
            const fetchUserData = async () => {
                try {
                    if (user?.email) {
                        if(user?.role === "Admin"){
                        const response = await apiClient.get(`/api/user/email/${user.email}`);
                        console.log('....ll', response.data);
                        setBalance(response.data.balance);
                    }

                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            };

            fetchUserData();
        }, [user]); // Adding `user` as a dependency

        return (
            <>
            <Navbar />
                <div className="flex">
                    {user ? (
                        <>
                        {user.role === "Admin" ? (
                            <ASidebar />  // Admin Sidebar
                        ) : user.role === "Delivery Boy" ? (
                            <BSidebar />  // Delivery Boy Sidebar
                        ) : (
                            <Sidebar />  // Default Sidebar for other users
                        )}
                        </>
                    ) : null}

                    <div className='flex justify-center items-center lg:ml-56 mt-56 lg:mt-0 mx-auto'>
                        <div className="card bg-sky-600 text-primary-content w-96 mx-auto">
                            <div className="card-body">
                                <h2 className="card-title">Recieved Amount</h2>
                                <p className='text-center'>Balance:<span className='font-bold text-lg text-white'>{`${parseFloat(balance).toFixed(2)} Tk`}</span></p> {/* Display balance */}
                                <div className="card-actions justify-end">
                                    {/* <button className="btn text-white bg-green-950 border-0 hover:bg-green-900">
                                        Transfer to Admin Now
                                    </button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );

};

export default Casheer;
import React, { useContext } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const ASidebar = () => {
    const { user } = useContext(AuthContext);

    // Log user only when defined
    if (user) {
        console.log("...user of sidebar role permission:", user);
    }

    // // Show loading message if user is not available
    // if (!user) {
    //     return (
    //         <div className="flex items-center justify-center min-h-screen">
    //             <p className="text-lg font-semibold text-gray-600">
    //                 Loading user information...
    //             </p>
    //         </div>
    //     );
    // }

    return (
        <div className="flex">
            <div className="drawer lg:drawer-open">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    <label htmlFor="my-drawer" className="btn border-0 drawer-button lg:hidden fixed top-14 right-4 z-50">
                        <RxHamburgerMenu size={24} />
                    </label>
                </div>

                <div className="drawer-side">
                    <ul className="menu py-1 px-3 w-52 min-h-screen bg-gray-50 text-black font-semibold space-y-2 overflow-y-hidden">
                    <li><Link to="/adminboard/adminpage" className="text-lg">Dashboard</Link></li>
                    {user?.role !== "Accountant" && (
                        <>
                            
                            <li><Link to="/adminboard/user-display" className="text-lg">User Handle</Link></li>
                            <li><Link to="/userboard/con-details" className="text-lg">Consignments</Link></li>
                            <li><Link to="/adminboard/add-delivery-boy" className="text-lg">Add Member</Link></li>
                            <li><Link to="/adminboard/pricing-set" className="text-lg">Change Pricing</Link></li>
                            <li><Link to="/boyboard/partial-deli" className="text-lg">Partial Delivery</Link></li>
                        </>
                        )}
                     {user?.role !== "Data Entry Oparator" && (
                        <>  
                            <li><Link to="/adminboard/diposite" className="text-lg">Deposite Info.</Link></li>
                            <li><Link to="/adminboard/wise" className="text-lg">Marchant Due</Link></li>
                            <li><Link to="/adminboard/marchant-claim" className="text-lg">Marchant Claim</Link></li>
                            <li><Link to="/adminboard/claim-approved" className="text-lg">Claims History</Link></li>
                            <li><Link to="/adminboard/casheer" className="text-lg">Cash Amount</Link></li>
                        </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ASidebar;

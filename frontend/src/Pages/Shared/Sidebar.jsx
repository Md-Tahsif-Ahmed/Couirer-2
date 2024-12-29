import React, { useContext } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import { AuthContext } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const { user, token } = useContext(AuthContext);

    // Debugging: log the user and token values
    console.log('User:', user); 
    console.log('Token:', token); 

    return (
        <div className="flex">
            {/* Sidebar for desktop and hidden on mobile */}
            <div className="drawer lg:drawer-open">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* Hamburger for mobile */}
                    <label htmlFor="my-drawer" className="btn border-0 drawer-button lg:hidden fixed top-14 right-4 z-50">
                        <RxHamburgerMenu size={12} />
                    </label>
                </div>

                {/* Sidebar content */}
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
 
                    <ul className="menu px-4 w-64 min-h-screen bg-white text-black font-semibold space-y-2">
 
                        {/* <li><a href="/userboard/userpage" className="text-lg">Dashboard</a></li>
                        <li><a href="/userboard/addparcel" className="text-lg">Add parcel</a></li>
                        <li><a href="/userboard/con-details" className="text-lg">Consignments</a></li>
                        <li><a href="#reports" className="text-lg">Fraud check</a></li>
                        <li><a href="#reports" className="text-lg">Pickup Request</a></li>
                        <li><a href="/userboard/price" className="text-lg">Pricing</a></li>
                        <li><a href="/userboard/fileup" className="text-lg">Bulk Entry</a></li>
                        <li><a href="/boyboard/partial-deli" className="text-lg">Partial Delivery</a></li>
                        <li><a href="#reports" className="text-lg">Modarator</a></li>
                        <li><a href="/adminboard/claim-approved" className="text-lg">Claims History</a></li> */}
                        <li><Link to="/userboard/userpage" className="text-lg">Dashboard</Link></li>
                        <li><Link to="/userboard/addparcel" className="text-lg">Add Parcel</Link></li>
                        <li><Link to="/userboard/con-details" className="text-lg">Consignments</Link></li>
                        <li><a href="#reports" className="text-lg">Fraud Check</a></li>
                        <li><a href="#reports" className="text-lg">Pickup Request</a></li>
                        <li><Link to="/userboard/price" className="text-lg">Pricing</Link></li>
                        <li><Link to="/userboard/fileup" className="text-lg">Bulk Entry</Link></li>
                        <li><Link to="/boyboard/partial-deli" className="text-lg">Partial Delivery</Link></li>
                        <li><a href="#reports" className="text-lg">Moderator</a></li>
                        <li><Link to="/adminboard/claim-approved" className="text-lg">Claims History</Link></li>


                        {/* Conditionally render User History link */}
                        {user ? (
                            <li><Link to={`/userboard/user-history/${user.email}`} className="text-lg">User History</Link></li>
                        ) : (
                            <li><span className="text-lg text-gray-400">Login required for User History</span></li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

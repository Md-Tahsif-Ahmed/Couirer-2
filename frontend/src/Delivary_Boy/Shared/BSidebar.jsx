import React, { useContext } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
// import { AuthContext } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
const BSidebar = () => {
    // const { user, token } = useContext(AuthContext);

    // // Debugging: log the user and token values
    // console.log('User:', user); 
    // console.log('Token:', token); 

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
 
                    <ul className="menu p-4 w-64 min-h-screen bg-white text-black font-semibold space-y-2">
 
                        {/* <li><a href="/boyboard/boypage" className="text-lg">Dashboard</a></li>
                         
                        <li><a href="/boyboard/ready" className="text-lg">Ready Parcels</a></li>
                        <li><a href="/boyboard/asign" className="text-lg">Asigned Parcels</a></li>
                        <li><a href="/boyboard/pickup" className="text-lg">Pickup Parcels</a></li>
                        <li><a href="/boyboard/delevered" className="text-lg">Delevered Parcels</a></li>
                        <li><a href="/boyboard/partial-deli" className="text-lg">Partial Delivery</a></li>
                        <li><a href="/boyboard/boy-account" className="text-lg">My Account</a></li> */}
                        <li><Link to="/boyboard/boypage" className="text-lg">Dashboard</Link></li>
                        <li><Link to="/boyboard/ready" className="text-lg">Ready Parcels</Link></li>
                        <li><Link to="/boyboard/asign" className="text-lg">Asigned Parcels</Link></li>
                        <li><Link to="/boyboard/pickup" className="text-lg">Pickup Parcels</Link></li>
                        <li><Link to="/boyboard/delevered" className="text-lg">Delevered Parcels</Link></li>
                        <li><Link to="/boyboard/partial-deli" className="text-lg">Partial Delivery</Link></li>
                        <li><Link to="/boyboard/boy-account" className="text-lg">My Account</Link></li>


                  
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BSidebar;

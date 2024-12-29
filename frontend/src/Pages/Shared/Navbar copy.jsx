import React, { useContext, useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { AuthContext } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  let closeDropdownTimeout = null;

  // Dropdown handlers for desktop
  const openServicesDropdown = () => {
    clearTimeout(closeDropdownTimeout);
    setIsServicesDropdownOpen(true);
  };

  const closeServicesDropdown = () => {
    closeDropdownTimeout = setTimeout(() => {
      setIsServicesDropdownOpen(false);
    }, 200);
  };

  // Logout handler
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="navbar relative bg-black text-white flex justify-between items-center p-4 lg:p-6">
      {/* Left Side for Desktop */}
      <div className="navbar-start hidden lg:block">
        <a className="lg:text-xl text-xs">Courier Service</a>
      </div>

      {/* Center Menu for Desktop */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><a href="/">Home</a></li>
          <li
            onMouseEnter={openServicesDropdown}
            onMouseLeave={closeServicesDropdown}
            className='relative'
          >
            <a href="#" className="block py-2 ">Services</a>
            {isServicesDropdownOpen && (
            <div className="absolute z-20 bg-transparent">
                <div className=" bg-white text-black rounded-md mt-8 w-[400px] flex items-center justify-center p-4">
                <div className="">
                  <a href="#" className="block px-4 py-2">Express Delivery</a>
                  <a href="#" className="block px-4 py-2">Same Day Delivery</a>
                </div>
                 <div className="">
                  <a href="#" className="block px-4 py-2">International Shipping</a>
                  <a href="#" className="block px-4 py-2">Bulk Shipping</a>
                 </div>
              </div>
            </div>
            )}
          </li>
          <li><a href="#">Branches</a></li>
        </ul>
      </div>

      {/* Center Title for Mobile */}
      <div className="navbar-center ml-32 lg:hidden">
        <h3 className="text-xs font-semibold">Courier Service</h3>
      </div>

      {/* Right Side with User Avatar and Dropdown */}
      <div className="navbar-end">
        {user ? (
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="w-10 h-10 bg-white-500 text-white font-bold rounded-full flex items-center justify-center"
            >
              {user.username[0].toUpperCase()}
            </button>

            {isUserMenuOpen && (
              <ul
                className="absolute right-0 mt-2 p-2 shadow bg-white text-black rounded-lg w-48 z-10"
                onMouseLeave={() => setIsUserMenuOpen(false)}
              >
                <li className="px-4 py-2 font-bold">
                  {user.username}
                </li>
                <li>
                  <Link to="/userboard/profile" className="block px-4 py-2">Profile</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2">
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Navbar;

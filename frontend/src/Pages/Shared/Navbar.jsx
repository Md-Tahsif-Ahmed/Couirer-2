import React, { useContext, useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { AuthContext } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/Tspeed.jpg';
import BalanceChecker from '../User/marchantAcc/BalanceChecker';

const Navbar = () => {
  const { user, token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Toggle handlers
  const toggleServicesDropdown = () => {
    setIsServicesDropdownOpen(!isServicesDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  // Logout handler
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="bg-white text-black font-bold relative">
      {/* Main Navbar */}
      <div className="navbar flex justify-around items-center p-4 lg:px-6">
        {/* Left: Logo and Mobile Menu */}
        <div className="navbar flex items-center space-x-12 lg:space-x-0">
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden text-black mr-2 focus:outline-none"
          >
            <RxHamburgerMenu size={24} />
           
          </button>
          <div className="block space-y-1 lg:space-y-0">
              <Link to="/">
                    <img src={logo} alt="Company Logo" className="h-16 w-36 lg:h-20 lg:w-48" />
              </Link>
              <div className="lg:hidden">
                  <BalanceChecker user={user} token={token}></BalanceChecker>
              </div>
          </div>
        
        </div>

        {/* Center: Desktop Menu */}
        <div className="hidden lg:flex navbar-center">
          <ul className="menu menu-horizontal space-x-6">
            <li><Link to="/">Home</Link></li>
            <li className="relative">
              <button
                onClick={toggleServicesDropdown}
                className="py-2 focus:outline-none"
              >
                Services
              </button>
              {isServicesDropdownOpen && (
                <div className="absolute top-full mt-2 w-[300px] bg-white font-medium text-black rounded-lg shadow-lg z-50">
                  <div className="p-4 grid grid-cols-1 gap-2">
                    <Link to="#" className="p-2 rounded hover:bg-gray-100">Express Delivery</Link>
                    <Link to="#" className="p-2 rounded hover:bg-gray-100">Same Day Delivery</Link>
                    <Link to="#" className="p-2 rounded hover:bg-gray-100">International Shipping</Link>
                    <Link to="#" className="p-2 rounded hover:bg-gray-100">Bulk Shipping</Link>
                  </div>
                </div>
              )}
            </li>
            <li><Link to="/branches">Branches</Link></li>
          </ul>
        </div>

        {/* Balance Checker */}
        <div className="hidden lg:block">
              <BalanceChecker user={user} token={token}></BalanceChecker>
        </div>

        {/* Right: User Menu */}
        <div className="hidden lg:flex navbar-end">
          {user ? (
            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="w-10 h-10 bg-gray-500 text-white font-bold rounded-full flex items-center justify-center"
              >
                {user.username[0].toUpperCase()}
              </button>
              {isUserMenuOpen && (
                <ul className="absolute right-0 mt-2 bg-gray-700 text-white rounded-lg shadow-lg w-48 z-10">
                  <li className="px-4 py-2 font-bold">{user.username}</li>
                  <li>
                    <Link to="/userboard/profile" className="block px-4 py-2 hover:bg-gray-600">Profile</Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-600"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <Link to="/login" className="text-black">Login</Link>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden bg-gray-700 text-white p-4 absolute top-full left-0 w-full z-50"
        >
          <ul className="space-y-4">
            <li><Link to="/">Home</Link></li>
            <li>
              <button
                onClick={toggleServicesDropdown}
                className="w-full text-left focus:outline-none"
              >
                Services
              </button>
              {isServicesDropdownOpen && (
                <div className="bg-gray-800 text-white rounded-lg mt-2 space-y-2 p-4 shadow-lg">
                  <Link to="#" className="block px-2 py-1 hover:bg-gray-600 rounded">Express Delivery</Link>
                  <Link to="#" className="block px-2 py-1 hover:bg-gray-600 rounded">Same Day Delivery</Link>
                  <Link to="#" className="block px-2 py-1 hover:bg-gray-600 rounded">International Shipping</Link>
                  <Link to="#" className="block px-2 py-1 hover:bg-gray-600 rounded">Bulk Shipping</Link>
                </div>
              )}
            </li>
            <li><Link to="/branches">Branches</Link></li>
            {user && (
              <li>
                <button
                  onClick={toggleUserMenu}
                  className="w-10 h-10 bg-gray-500 text-white font-bold rounded-full flex items-center justify-center"
                >
                  {user.username[0].toUpperCase()}
                </button>
                {isUserMenuOpen && (
                  <ul className="bg-gray-800 text-white rounded-lg mt-2 space-y-2 p-4 shadow-lg">
                    <li>{user.username}</li>
                    <li>
                      <Link to="/userboard/profile" className="block px-2 py-1 hover:bg-gray-600 rounded">Profile</Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block px-2 py-1 hover:bg-gray-600 rounded"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;

import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import logo from "../assets/Tspeed.jpg";

function Navbar() {
  const [sticky, setSticky] = useState(false);
  const { user, logout } = useContext(AuthContext); // Access user and logout from context
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Define navigation items
  const navItems = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/pricing">Pricing</Link>
      </li>
      <li>
        <Link to="/track-parcel">Track Parcel</Link>
      </li>
      <li>
        <Link to="/Marchant-support">Marchant Support</Link>
      </li>
      <li><Link to="/branches">Branches</Link></li>
    </>
  );

  // Handle logout and redirect
  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <div
      className={`max-w-screen-2xl container mx-auto dark:bg-slate-900 dark:text-white fixed top-0 left-0 right-0 z-50 ${
        sticky
          ? "sticky-navbar shadow-md bg-base-950 duration-300 dark:bg-slate-950 dark:text-white transition-all ease-in-out"
          : ""
      }`}
    >
      <div className="navbar bg-base-100 flex justify-center lg:justify-around items-center space-x-10 pl-12 pr-4">
        <div className="lg:navbar-start space-10 relative">
         <div className="hidden lg:block">
          <Link to="/" className="cursor-pointer">
              <img
                src={logo}
                alt="Company Logo"
                className="h-8 lg:h-24 lg:w-52 object-contain"
              />
            </Link>
         </div>
          <div className="dropdown absolute -left-12">
            <label
              tabIndex={0}
              className="btn btn-ghost lg:hidden"
              role="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navItems}
            </ul>
          </div>
          {/* mobile for center */}
          <div className="lg:hidden ml-32">
          <Link to="/" className="cursor-pointer">
              <img
                src={logo}
                alt="Company Logo"
                className="h-12 w-56  lg:h-24 lg:w-52 object-cover"
              />
            </Link>
         </div>

        </div>
        <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 font-bold">{navItems}</ul>
          </div>
        <div className="navbar-end space-x-3 ">
         
          {/* <div className="hidden md:block">
            <label className="px-3 py-2 border rounded-md flex items-center gap-2 focus-within:ring focus-within:ring-green-500 dark:focus-within:ring-white">
              <input
                type="text"
                className="grow outline-none dark:bg-slate-950 dark:text-white"
                placeholder="Search"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div> */}

          {/* Conditional Rendering Based on Authentication State */}
          {user ? (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle flex items-center gap-2"
              >
                <span className="text-white font-bold">{user.username}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="mt-2 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/userboard/profile">Profile</Link>
                </li>
                {user?.role === "Delivery Boy" ? (
                  <li>
                    <Link to="/boyboard/boypage">Dashboard</Link>
                  </li>
                ) : user?.role === "Admin" ? (
                  <li>
                    <Link to="/adminboard/adminpage">Dashboard</Link>
                  </li>
                ) : (
                  <li>
                    <Link to="/userboard/userpage">Dashboard</Link>
                  </li>
                )}

                <li>
                  <button onClick={handleLogout} className="w-full text-left">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-purple-700 text-white px-3 py-1 rounded-md hover:bg-purple-900 duration-300 cursor-pointer "
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
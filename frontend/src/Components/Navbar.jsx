import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useLogoutMutation } from "../features/auth/authApi";
import { toast } from "react-toastify";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("user");
      navigate("/login");
      toast("Logout successfully ")
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="p-4 md:px-10 shadow-md bg-white flex justify-between items-center">
      <Link to="/">
        <h1 className="text-xl md:text-2xl font-bold md:px-10 text-blue-800 hover:text-blue-600 transition-all">
          Logo
        </h1>
      </Link>

      {user && (
        <div className="flex items-center  space-x-6 relative">
          {user.role === "admin" && (
            <>
            <p className="text-red-500 text-sm">Hello Admin</p>
              <Link
                to="/dashboard"
                className="text-gray-700 font-small bg-blue-900 text-white p-2  transition"
              >
                Dashboard
              </Link>
            </>
          )}

          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <FaUserCircle className="text-2xl text-gray-600" />
            <span className="text-gray-800 font-medium">{user.name}</span>
          </button>

          {dropdownOpen && (
            <div className="absolute top-12 right-0 w-40 bg-white shadow-lg rounded-md z-10">
              <button
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center space-x-2"
                onClick={handleLogout}
              >
                <MdLogout />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;

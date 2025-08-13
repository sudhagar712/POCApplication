import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars, FaHome } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useLogoutMutation } from "../../features/auth/authApi";
import { toast } from "react-toastify";

const Header = ({ onToggleSidebar }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("user");
      navigate("/login");
      toast("Logout successfully");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <header className="bg-white shadow-md px-4 py-3 flex items-center md:justify-between gap-[100px] relative flex-wrap">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        {/* Mobile Sidebar Toggle */}
        <button
          onClick={onToggleSidebar}
          className="text-2xl text-blue-900 lg:hidden"
        >
          <FaBars />
        </button>

        <h1 className="text-lg sm:text-xl font-bold text-blue-900 whitespace-nowrap">
          Admin Dashboard
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4 mt-2 sm:mt-0">
        {/* Home link - hidden on xs */}
        <Link to="/" className="hidden sm:block hover:text-blue-600">
          Home
        </Link>

        {/* Home icon for mobile */}
        <Link
          to="/"
          className="sm:hidden text-xl text-blue-900 hover:text-blue-600"
        >
          <FaHome />
        </Link>

        {/* User dropdown toggle */}
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center focus:outline-none"
        >
          <FaUserCircle className="text-2xl text-gray-600" />
        </button>
      </div>

      {/* Dropdown */}
      {dropdownOpen && (
        <div className="absolute top-full mt-2 right-4 w-40 bg-white shadow-lg rounded-md z-50">
          <button
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center gap-2"
            onClick={handleLogout}
          >
            <MdLogout />
            <span>Logout</span>
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;

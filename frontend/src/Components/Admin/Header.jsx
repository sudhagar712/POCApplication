import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars } from "react-icons/fa";
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
       toast("Logout successfully ")
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <header className="bg-white shadow-md px-4 py-3 flex items-center justify-between relative">
     
      <button
        onClick={onToggleSidebar}
        className="text-2xl text-blue-900  mr-4"
      >
        <FaBars />
      </button>

      <h1 className="text-xl font-bold text-blue-900">Admin Dashboard</h1>

      <div className="flex items-center gap-4">
        <Link to="/" className="hover:text-blue-600">
          Home
        </Link>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center space-x-2 focus:outline-none"
        >
          <FaUserCircle className="text-2xl text-gray-600" />
        </button>
      </div>

      {dropdownOpen && (
        <div className="absolute top-14 right-4 w-40 bg-white shadow-lg rounded-md z-10">
          <button
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center space-x-2"
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

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdDashboard, MdLogout } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { toast } from "react-toastify";
import { useLogoutMutation } from "../../features/auth/authApi";

const Sidebar = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const [logout] = useLogoutMutation();


    const handleLogout = async () => {
      try {
        await logout();
        localStorage.removeItem("user");
        navigate("/login");
        toast("Logout successfully ");
      } catch (err) {
        console.error("Logout failed", err);
      }
    };

  return (
    <aside className="w-64 bg-blue-900 text-white flex flex-col p-4">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <nav className="flex flex-col space-y-4">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 hover:text-blue-300 transition"
        >
          <MdDashboard />
          <span>Dashboard</span>
        </Link>
        <Link
          to="/dashboard/users"
          className="flex items-center gap-2 hover:text-blue-300 transition"
        >
          <FaUsers />
          <span>Users</span>
        </Link>
      </nav>

      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-2 hover:text-red-300 transition"
      >
        <MdLogout />
        <span>Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;

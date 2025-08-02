import React, { useState } from "react";
import { useLoginMutation } from "../features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { decodeToken } from "../utils/decodeToken";

const Login = () => {
  const [tab, setTab] = useState("seller");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ ...formData, role: tab }).unwrap();
      const { token } = res;
      const decoded = decodeToken(token);
      if (!decoded) throw new Error("Invalid token");

      const userInfo = {
        name: decoded.name,
        email: decoded.email,
        role: decoded.role,
        _id: decoded.id,
        token,
      };

      dispatch(setUser(userInfo));
      toast.success(`${tab.toUpperCase()} login successful!`);

      if (decoded.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      toast.error(err?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="w-full max-w-md p-8 shadow-xl bg-white rounded-xl">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        {/* Role Tabs */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setTab("seller")}
            className={`px-4 py-2 border rounded-l-full ${
              tab === "seller" ? "bg-blue-900 text-white" : "bg-gray-200"
            }`}
          >
            Seller
          </button>
          <button
            onClick={() => setTab("admin")}
            className={`px-4 py-2 border rounded-r-full ${
              tab === "admin" ? "bg-blue-900 text-white" : "bg-gray-200"
            }`}
          >
            Admin
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          {/* Email */}
          <div className="form-control mb-4 w-full">
            <label className="label flex gap-2 items-center">
              <MdEmail />
              <span>Email</span>
            </label>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full"
              autoComplete="off"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="form-control mb-4 w-full">
            <label className="label flex gap-2 items-center">
              <RiLockPasswordLine />
              <span>Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="input input-bordered w-full pr-10"
                autoComplete="off"
                required
                value={formData.password}
                onChange={handleChange}
              />
              <span
                className="absolute top-3 right-3 z-10 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>
          </div>

          {/* Submit */}
          <button
            className="bg-blue-900 text-white shadow-lg p-2 border font-bold border-black w-full mt-2"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : `Login as ${tab}`}
          </button>
        </form>

        {/* Redirect to Signup */}
        <p className="mt-4 text-center">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-blue-600">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

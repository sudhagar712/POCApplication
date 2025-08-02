import React, { useState } from "react";
import { useSignupMutation } from "../features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [signup, { isLoading }] = useSignupMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(formData).unwrap();
      dispatch(setUser(res));
      toast.success("Signup successful!");
      navigate("/login");
    } catch (err) {
      toast.error(err?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="w-full max-w-md p-8 shadow-xl bg-white rounded-xl">
        <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>
        <form onSubmit={handleSignup}>
          {/* Name */}
          <div className="form-control mb-4 w-full">
            <label className="label flex gap-2 items-center">
              <FaUser />
              <span>Name</span>
            </label>
            <input
              type="text"
              name="name"
              className="input input-bordered w-full"
              autoComplete="off"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>

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

       
          {/* Password with toggle */}
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

          <button
            className="bg-blue-900 text-white shadow-lg p-2 border font-bold border-black w-full mt-2"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Signing up..." : "Signup"}
          </button>
        </form>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;

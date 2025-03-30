import React, { useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { commoncontext } from "../contexts/commoncontext";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const { setToken, setUser,user ,showNavbar , setShowNavbar } = useContext(commoncontext);
       setShowNavbar(true);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!formData.password || !formData.confirmPassword) {
      toast.error("Both password fields are required!");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    try {
      const response = await axios.post(`${backendUrl}/api/auth/resetpassword`, {
        token,
        password: formData.password,
      });

      if (response.data.success) {
        toast.success("Password reset successfully! Please log in.");
        navigate("/login");
      } else {
        toast.error(response.data.message || "Password reset failed.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div
    style={{
      backgroundImage: "url('chessfloor2.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
    className="flex justify-center items-center min-h-screen bg-black text-white"
  >
    <div className="w-80 p-5 shadow-lg rounded-lg backdrop-blur-lg relative" style={{ marginTop: '-10%' }}>
      <h2 className="text-3xl font-semibold pb-2 text-center text-white neon-text">Reset Password</h2>
      <form className="mt-3" onSubmit={handleResetPassword}>
        <div className="mb-3">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-white-500"
            placeholder="Enter New Password"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-white-500"
            placeholder="Confirm Password"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-2 w-full py-2 font-bold bg-red-500 hover:bg-gray-900 rounded-md text-white font-semibold shadow-md"
        >
          Reset Password
        </button>
      </form>
    </div>
  </div>
  );
};

export default ResetPassword;

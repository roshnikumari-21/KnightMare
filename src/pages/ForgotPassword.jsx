import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { commoncontext } from "../contexts/commoncontext";

const forgotPassword = () => {
  const { setToken, setUser ,backendUrl , showNavbar , setShowNavbar} = useContext(commoncontext);
     setShowNavbar(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      toast.error("Email is required");
      return;
    }

    try {
      const response = await axios.post(`${backendUrl}/api/auth/forgotpassword`,formData);
      if (response.data.success) {
        toast.success("Password reset token sent to email!");
        navigate("/");
      } else {
        toast.error(response.data.message || "Failed to send reset token");
      }
    } catch (error) {
      console.error("Error during forgot password:", error);
      toast.error("An error occurred. Please try again.");
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
        <h2 className="text-3xl font-semibold pb-2 text-center text-white neon-text">Forgot Password or want to change?</h2>
        <form className="mt-3" onSubmit={handleForgotPassword}>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-white-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-2 w-full py-2 font-bold bg-red-500 hover:bg-gray-900 rounded-md text-white font-semibold shadow-md"
          >
            Send Reset Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default forgotPassword;
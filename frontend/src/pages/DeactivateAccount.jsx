import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { commoncontext } from "../contexts/commoncontext";
import { useNavigate } from "react-router-dom";

const DeactivateAccount = () => {
  const { backendUrl, token, user, logout } = useContext(commoncontext);
  const [password, setPassword] = useState("");
  const [confirmationText, setConfirmationText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleDeactivate = async (e) => {
    e.preventDefault();
    if (!password) {
      toast.error("Please enter your password to confirm.");
      return;
    }
    if (confirmationText !== "DEACTIVATE MY ACCOUNT") {
      toast.error('Please type "DEACTIVATE MY ACCOUNT" to confirm.');
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${backendUrl}/api/auth/deactivateAccount`,
        { email: user.email, password },
        {
          headers: {
            token: token,
          },
        }
      );
      if (response.data.success) {
        toast.success("Account deactivated successfully.");
        logout();
        navigate("/login");
      } else {
        toast.error(response.data.message || "Failed to deactivate account.");
      }
    } catch (error) {
      console.error("Error deactivating account:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('/chessfloor2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="flex justify-center items-center min-h-screen bg-black text-white p-4"
    >
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md p-5 shadow-lg rounded-lg backdrop-blur-lg relative">
        <h2 className="text-2xl sm:text-3xl font-semibold pb-2 text-center text-white neon-text">
          Deactivate Account
        </h2>
        <p className="text-sm text-center text-gray-300 mb-6">
          Are you sure you want to deactivate your account? This action cannot be undone.
        </p>
        
        <form onSubmit={handleDeactivate}>
          {/* Password Field */}
          <div className="mb-4">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-white-500"
              placeholder="Enter your password"
              required
            />
          </div>
  
          {/* Confirmation Text Field */}
          <div className="mb-4">
            <input
              type="text"
              id="confirmationText"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value.toUpperCase())}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-white-500"
              placeholder='Type "DEACTIVATE MY ACCOUNT"'
              required
            />
          </div>
  
          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || confirmationText !== "DEACTIVATE MY ACCOUNT"}
            className="mt-2 w-full py-2 bg-red-500 hover:bg-red-600 rounded-md text-white font-semibold shadow-md transition duration-300 disabled:bg-red-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "Deactivating..." : "Deactivate Account"}
          </button>
        </form>
  
        <div className="mt-4 border-t border-gray-700 pt-4">
          <p className="text-center text-gray-400">Changed your mind?</p>
          <p className="text-center text-gray-200 mt-2">
            Go back to <a href="/home-user" className="text-gray-900 hover:underline">Home</a>
          </p>
        </div>
      </div>
    </div>
  );
  
};

export default DeactivateAccount;
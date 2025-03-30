import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { commoncontext } from "../contexts/commoncontext";
import { GoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../utils/api";

const Register = () => {
  const { setToken, setUser,user,token,backendUrl ,showNavbar , setShowNavbar } = useContext(commoncontext);
    setShowNavbar(true);
    const navigate = useNavigate();
  
    const responseGoogle = async (authResult) => {
      try {
        if (authResult["code"]) {
          const result = await googleAuth(authResult.code);
          if (result.data.success) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            setToken(response.data.token);
            setUser(response.data.user);
            toast.success("Login successful!");
            navigate("/home-user");
          } else {
            toast.error(response.data.message || "Login failed");
          }
        } else {
          console.log(authResult);
          throw new Error(authResult);
        }
      } catch (e) {
        console.log('Error while Google Login...', e);
      }
    };
  
    const handleGoogleSuccess = async (response) => {
      const googleToken = response.credential;
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/googlelogin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: googleToken }),
        });
  
        const data = await res.json();
        localStorage.setItem('token', data.token);
        setToken(data.token);
        localStorage.setItem('user',data.user);
        setUser(data.user);
        if (res.ok) {
          navigate('/');
        } else {
          console.error('Error during Google Login:', data.message);
        }
      } catch (error) {
        console.error('Google Login API Error:', error);
      }
    };
    const handleGoogleFailure = (error) => {
      console.error('Google Login Error:', error);
    };

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      toast.error("All fields are required");
      return;
    }

    try {
      const response = await axios.post(`${backendUrl}/api/auth/register`, formData);
      if (response.data.success) {
        setToken(response.data.token)
        setUser(response.data.user);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user",JSON.stringify(response.data.user));
        toast.success("Registration successful!");
        navigate("/home-user");
      } else {
        toast.error(response.data.message || "Registration failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred during registration");
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
      className="flex justify-center items-center heii bg-black text-white"
    >
      <div className="w-80 p-5 shadow-lg rounded-lg backdrop-blur-lg relative" >
        <h2 className="text-3xl font-semibold pb-2 text-center text-white neon-text">Create Account</h2>
        <p className="text-sm text-center">Sign up to get started</p>
        <form className="mt-3" onSubmit={handleRegister}>
          <div className="mb-3">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-white-500"
              placeholder="Enter username"
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-white-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-white-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="mt-2 w-full py-2 bg-red-500 hover:bg-gray-900 rounded-md text-white font-semibold shadow-md"
          >
            Create →
          </button>
        </form>
        <div className="mt-4 border-t border-gray-700 pt-4">
          <p className="text-center text-gray-400">OR</p>
                    <div className="mt-4 space-y-3">
                        <GoogleLogin
                          onSuccess={handleGoogleSuccess}
                          onError={handleGoogleFailure}
                          useOneTap
                        />
                    </div>
          <p className="text-center text-gray-200 mt-4">
            Already have an account? <a href="/login" className="text-white hover:underline">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
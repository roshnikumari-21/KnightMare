import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { commoncontext } from "../contexts/commoncontext";
import { useNavigate } from "react-router";
import { FaCamera } from "react-icons/fa";

const ChangeProfilePic = () => {
    const Navigate = useNavigate();
  const { backendUrl, token, user ,setUser } = useContext(commoncontext);
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image1", image);
    formData.append("email", user.email);

    try {
      const response = await axios.post(`${backendUrl}/api/auth/uploadProfilePic`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: token,
        },
      });

      if (response.data.success) {
        toast.success("Profile picture updated successfully!");
        setImage(null);
        setPreviewImage(null);
        setUser(response.data.user);
        Navigate('/profile')
      } else {
        toast.error(response.data.message || "Failed to update profile picture.");
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      toast.error("An error occurred. Please try again.");
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
      className="flex justify-center items-center min-h-screen bg-black text-white px-4 sm:px-6"
    >
      <div 
        className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg p-5 shadow-lg rounded-lg backdrop-blur-lg relative"
        style={{ marginTop: '-10%' }}
      >
        <h2 className="text-xl sm:text-2xl font-semibold pb-2 text-center text-white neon-text">
          Change Profile Picture
        </h2>
        
        <form className="mt-3" onSubmit={handleSubmit}>
          {/* Image Upload */}
          <div className="mb-3">
            <label htmlFor="profilePicture" className="cursor-pointer">
              <div className="w-32 sm:w-40 h-32 sm:h-40 bg-gray-800 border border-gray-700 rounded-full flex mx-auto justify-center items-center">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <div className="flex flex-col items-center">
                    <FaCamera className="text-gray-400 text-2xl sm:text-3xl mb-2" />
                    <span className="text-gray-400 text-xs sm:text-sm">
                      Click to choose file
                    </span>
                  </div>
                )}
              </div>
              <input
                type="file"
                id="profilePicture"
                name="profilePicture"
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
                required
              />
            </label>
          </div>
  
          {/* Submit Button */}
          <button
            type="submit"
            className="mt-2 w-full py-2 font-bold bg-red-600 hover:bg-red-500 rounded-md text-white font-semibold shadow-md"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
  
};

export default ChangeProfilePic;
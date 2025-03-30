import React from "react";
import { useNavigate } from "react-router";


const ProfileSettings = () => {
  const Navigate = useNavigate();
  return (
    <div className="ml-14 mr-14 mt-6 pt-4 rounded-xl bg-black bg-opacity-60 p-8 shadow-lg">
      {/* Title */}
      <h2 className="text-4xl font-extrabold text-white mb-8 border-b-2 border-white pb-4">
        Profile Settings
      </h2>

      {/* Change Profile Picture */}
      <div style={{
      backgroundImage: "url('/bgmodernblack.jpg')",
      backgroundSize: "cover",
    }} className="flex items-center mb-6 p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors duration-300">
        <i className="fas fa-camera text-2xl text-blue-500 mr-4"></i> {/* Camera icon */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white">Change Profile Picture</h3>
          <p className="text-gray-400">Upload a new profile image.</p>
        </div>
        <button onClick={()=> Navigate('/changeprofilepic')} className="bg-slate-900 text-white px-6 py-2 rounded-full hover:bg-slate-800 transition-colors duration-300 border-1 border-white">
          Change
        </button>
      </div>

      {/* Change Username */}
      <div style={{
      backgroundImage: "url('/bgmodernblack.jpg')",
      backgroundSize: "cover", 
    }} className="flex items-center mb-6 p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors duration-300">
        <i className="fas fa-user-edit text-2xl text-green-500 mr-4"></i> {/* Edit icon */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white">Change Username</h3>
          <p className="text-gray-400">Update your display name.</p>
        </div>
        <button className="bg-slate-900 text-white px-6 py-2 rounded-full hover:bg-slate-800 transition-colors duration-300 border-1 border-white">
          Change
        </button>
      </div>

      {/* Change Password */}
      <div style={{
      backgroundImage: "url('/bgmodernblack.jpg')",
      backgroundSize: "cover",
    }} className="flex items-center mb-6 p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors duration-300">
        <i className="fas fa-lock text-2xl text-purple-500 mr-4"></i> {/* Lock icon */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white">Change Password</h3>
          <p className="text-gray-400">Set a new password for your account.</p>
        </div>
        <button onClick = {(e)=>Navigate('/forgotpassword')} className="bg-slate-900 text-white px-6 py-2 rounded-full hover:bg-slate-800 transition-colors duration-300 border-1 border-white">
          Change
        </button>
      </div>

      {/* Deactivate Account */}
      <div style={{
      backgroundImage: "url('/bgmodernblack.jpg')",
      backgroundSize: "cover",
    }} className="flex items-center mb-6 p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors duration-300">
        <i className="fas fa-user-slash text-2xl text-red-500 mr-4"></i> {/* Deactivate icon */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white">Deactivate Account</h3>
          <p className="text-gray-400">Permanently delete your account details</p>
        </div>
        <button onClick={()=>Navigate('/deactivateAccount')} className="bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-800 transition-colors duration-300 border-1 border-white">
          Deactivate
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;

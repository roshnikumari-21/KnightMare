import React from "react";
import { useNavigate } from "react-router";


const ProfileSettings = () => {
  const Navigate = useNavigate();
  return (
    <div className="max-w-xl mx-auto w-full sm:w-[90%] md:w-[80%] mt-6 pt-4 rounded-xl bg-black bg-opacity-60 p-4 sm:p-6 shadow-lg">
      {/* Title */}
      <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 sm:mb-8 border-b-2 border-white pb-4 text-center">
        Profile Settings
      </h2>
  
      {/* Settings Options */}
      {[
        {
          icon: "fas fa-camera",
          color: "text-blue-500",
          title: "Change Profile Picture",
          description: "Upload a new profile image.",
          action: () => Navigate('/changeprofilepic'),
          buttonLabel: "Change",
        },
        {
          icon: "fas fa-user-edit",
          color: "text-green-500",
          title: "Change Username",
          description: "Update your display name.",
          action: () => console.log("Change username"),
          buttonLabel: "Change",
        },
        {
          icon: "fas fa-lock",
          color: "text-purple-500",
          title: "Change Password",
          description: "Set a new password for your account.",
          action: () => Navigate('/forgotpassword'),
          buttonLabel: "Change",
        },
        {
          icon: "fas fa-user-slash",
          color: "text-red-500",
          title: "Deactivate Account",
          description: "Permanently delete your account details.",
          action: () => Navigate('/deactivateAccount'),
          buttonLabel: "Deactivate",
        },
      ].map((item, index) => (
        <div
          key={index}
          style={{ backgroundImage: "url('/bgmodernblack.jpg')", backgroundSize: "cover" }}
          className="flex flex-col sm:flex-row items-center justify-between mb-6 p-4 sm:p-6 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors duration-300"
        >
          <div className="flex items-center w-full sm:w-auto mb-4 sm:mb-0">
            <i className={`${item.icon} text-2xl ${item.color} mr-4`}></i>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">{item.title}</h3>
              <p className="text-gray-400">{item.description}</p>
            </div>
          </div>
          <button
            onClick={item.action}
            className="bg-slate-900 text-white text-sm sm:text-base px-4 sm:px-6 py-2 rounded-full hover:bg-slate-800 transition-colors duration-300 border border-white w-full sm:w-auto"
          >
            {item.buttonLabel}
          </button>
        </div>
      ))}
    </div>
  );
  
};

export default ProfileSettings;

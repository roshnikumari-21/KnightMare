// import React from "react";
// import { useNavigate } from "react-router";


// const ProfileSettings = () => {
//   const Navigate = useNavigate();
//   return (
//     <div className="ml-14 mr-14 mt-6 pt-4 rounded-xl bg-black bg-opacity-60 p-8 shadow-lg">
//       {/* Title */}
//       <h2 className="text-4xl font-extrabold text-white mb-8 border-b-2 border-white pb-4">
//         Profile Settings
//       </h2>

//       {/* Change Profile Picture */}
//       <div style={{
//       backgroundImage: "url('/bgmodernblack.jpg')",
//       backgroundSize: "cover",
//     }} className="flex items-center mb-6 p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors duration-300">
//         <i className="fas fa-camera text-2xl text-blue-500 mr-4"></i> {/* Camera icon */}
//         <div className="flex-1">
//           <h3 className="text-xl font-bold text-white">Change Profile Picture</h3>
//           <p className="text-gray-400">Upload a new profile image.</p>
//         </div>
//         <button onClick={()=> Navigate('/changeprofilepic')} className="bg-slate-900 text-white px-6 py-2 rounded-full hover:bg-slate-800 transition-colors duration-300 border-1 border-white">
//           Change
//         </button>
//       </div>

//       {/* Change Username */}
//       <div style={{
//       backgroundImage: "url('/bgmodernblack.jpg')",
//       backgroundSize: "cover", 
//     }} className="flex items-center mb-6 p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors duration-300">
//         <i className="fas fa-user-edit text-2xl text-green-500 mr-4"></i> {/* Edit icon */}
//         <div className="flex-1">
//           <h3 className="text-xl font-bold text-white">Change Username</h3>
//           <p className="text-gray-400">Update your display name.</p>
//         </div>
//         <button className="bg-slate-900 text-white px-6 py-2 rounded-full hover:bg-slate-800 transition-colors duration-300 border-1 border-white">
//           Change
//         </button>
//       </div>

//       {/* Change Password */}
//       <div style={{
//       backgroundImage: "url('/bgmodernblack.jpg')",
//       backgroundSize: "cover",
//     }} className="flex items-center mb-6 p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors duration-300">
//         <i className="fas fa-lock text-2xl text-purple-500 mr-4"></i> {/* Lock icon */}
//         <div className="flex-1">
//           <h3 className="text-xl font-bold text-white">Change Password</h3>
//           <p className="text-gray-400">Set a new password for your account.</p>
//         </div>
//         <button onClick = {(e)=>Navigate('/forgotpassword')} className="bg-slate-900 text-white px-6 py-2 rounded-full hover:bg-slate-800 transition-colors duration-300 border-1 border-white">
//           Change
//         </button>
//       </div>

//       {/* Deactivate Account */}
//       <div style={{
//       backgroundImage: "url('/bgmodernblack.jpg')",
//       backgroundSize: "cover",
//     }} className="flex items-center mb-6 p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors duration-300">
//         <i className="fas fa-user-slash text-2xl text-red-500 mr-4"></i> {/* Deactivate icon */}
//         <div className="flex-1">
//           <h3 className="text-xl font-bold text-white">Deactivate Account</h3>
//           <p className="text-gray-400">Permanently delete your account details</p>
//         </div>
//         <button onClick={()=>Navigate('/deactivateAccount')} className="bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-800 transition-colors duration-300 border-1 border-white">
//           Deactivate
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProfileSettings;




import React from "react";
import { useNavigate } from "react-router";

const ProfileSettings = () => {
  const Navigate = useNavigate();
  return (
    <div className="mx-4 relative z-10 sm:mx-8 md:mx-14 mt-6 pt-4 rounded-xl bg-gray-900 bg-opacity-60 p-4 sm:p-6 md:p-8 shadow-lg">
      {/* Title */}
      <h2 className="  text-xl sm:text-3xl md:text-4xl font-extrabold text-white mb-6 sm:mb-8 border-b-2 border-white pb-2 sm:pb-4">
        Profile Settings
      </h2>

      {/* Sections */}
      {[
        {
          icon: "fas fa-camera",
          iconColor: "text-blue-500",
          title: "Change Profile Picture",
          desc: "Upload a new profile image.",
          btnText: "Change",
          route: "/changeprofilepic",
        },
        {
          icon: "fas fa-user-edit",
          iconColor: "text-green-500",
          title: "Change Username",
          desc: "Update your display name.",
          btnText: "Change",
          route: "/changeusername", // Add this route in your app if needed
        },
        {
          icon: "fas fa-lock",
          iconColor: "text-purple-500",
          title: "Change Password",
          desc: "Set a new password for your account.",
          btnText: "Change",
          route: "/forgotpassword",
        },
        {
          icon: "fas fa-user-slash",
          iconColor: "text-red-500",
          title: "Deactivate Account",
          desc: "Permanently delete your account details",
          btnText: "Deactivate",
          route: "/deactivateAccount",
        },
      ].map((item, idx) => (
        <div
          key={idx}
          // style={{
          //   backgroundImage: "url('/bgmodernblack.jpg')",
          //   backgroundSize: "cover",
          // }}
          className="flex border-gray-400 border bg-gray-800 flex-row items-start  mb-3 md:mb-6 p-4  rounded-lg hover:bg-gray-800 transition-colors duration-300"
        >
          <i className={`${item.icon} mr-1 text-xl md:text-2xl ${item.iconColor} mb-2  sm:mr-4`}></i>
          <div className="flex-1 mb-2 md:mb-4 sm:mb-0">
            <h3 className="text-semibold md:font-bold text-white">{item.title}</h3>
            <p className="text-sm sm:text-base text-gray-400">{item.desc}</p>
          </div>
          <button
            onClick={() => Navigate(item.route)}
            className="bg-slate-900 text-white px-4 sm:px-6 py-2 rounded-full hover:bg-slate-800 transition-colors duration-300 border border-gray-400"
          >
            {item.btnText}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProfileSettings;

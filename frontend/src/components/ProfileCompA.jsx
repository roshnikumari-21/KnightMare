import React, { useContext, useEffect, useState } from "react";
import { profileContext } from "../contexts/profileContext";

const ProfileCompA = () => {
  const { userProfile ,userRank} = useContext(profileContext);
  const [profile, setProfile] = useState(userProfile);

  useEffect(() => {
    setProfile(userProfile);
  }, [userProfile]);

  return (
    <div className="flex flex-col-reverse md:flex-row justify-between p-4 md:px-16 pb-0 gap-4 md:gap-12">
      {/* User Info Section */}
      <div className="text-center md:text-left">
        <h1 className="text-[8vw] md:text-[5.5vw] font-extrabold text-white">
          @{profile?.username || "Username"}
        </h1>
        <p className="text-gray-500 text-sm md:text-end mt-[-10px] md:mt-[-20px] mb-4">
          {profile?.email || "user@example.com"}
        </p>
  
        {/* Stats Section */}
        <div className="space-y-2">
          {[
            { label: "Rank", value: userRank || "NA", color: "text-amber-200", icon: "fas fa-trophy" },
            { label: "Score", value: profile?.score ?? "0", color: "text-red-600", icon: "fas fa-trophy" },
            { label: "Games Played", value: profile?.gamesPlayed ?? "0", color: "text-blue-600", icon: "fas fa-gamepad" },
            { label: "Games Won", value: profile?.gamesWon ?? "0", color: "text-green-400", icon: "fas fa-flag" },
            { label: "Hours Played", value: profile?.hoursPlayed ?? "0", color: "text-fuchsia-600", icon: "fas fa-clock" },
          ].map((stat, index) => (
            <div
              key={index}
              className="flex justify-center md:justify-start items-center bg-black border border-white p-2 pl-4 rounded-lg shadow-[0_4px_6px_rgba(255,255,255,0.1)] hover:shadow-[0_6px_8px_rgba(255,255,255,0.2)] transition-shadow duration-300"
            >
              <i className={`${stat.icon} ${stat.color} mr-2`}></i>
              <span className="text-white font-extrabold mr-2">{stat.label}:</span>
              <span className={`${stat.color} font-extrabold`}>{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
  
      {/* Profile Picture Section */}
      <div className="relative flex flex-col items-center justify-start mx-auto md:mx-0">
        <div
          style={{
            backgroundImage: profile?.profilePicture
              ? `url(${profile?.profilePicture})`
              : "url('/bg2.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="w-[30vw] h-[30vw] max-w-[150px] max-h-[150px] rounded-full border-4 border-white shadow-[0_0_10px_rgba(0,0,0,0.5)] hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]"
        ></div>
      </div>
    </div>
  );
  
};

export default ProfileCompA;


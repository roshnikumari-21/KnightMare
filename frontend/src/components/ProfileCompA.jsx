
import React, { useContext, useEffect, useState } from "react";
import { profileContext } from "../contexts/profileContext";

const ProfileCompA = () => {
  const { userProfile, userRank } = useContext(profileContext);
  const [profile, setProfile] = useState(userProfile);

  useEffect(() => {
    setProfile(userProfile);
  }, [userProfile]);

  return (
    <div className="flex flex-wrap justify-between items-start p-6 md:p-12 gap-8 bg-gray-950 text-white ">
      
      {/* Left Section - Name, Email, Stats */}
      <div className="flex-1 min-w-[250px]">
        <div className="flex flex-wrap items-center gap-4 mb-6">
          {/* Profile Image */}
          <div
            className="w-[28vw] h-[28vw] sm:w-[20vw] sm:h-[20vw] md:w-[10vw] md:h-[10vw] rounded-full border border-gray-500 shadow-[0_0_10px_rgba(0,0,0,0.5)] hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] transition duration-300"
            style={{
              backgroundImage: profile?.profilePicture
                ? `url(${profile?.profilePicture})`
                : "url('/bg2.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>

          {/* Username + Email */}
          <div>
            <h1 className="text-2xl md:text-5xl font-bold md:font-extrabold text-white leading-tight">
              {profile?.username || "Username"}
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {profile?.email || "user@example.com"}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="w-full space-y-2  md:space-y-3">
          {[
            {
              icon: "fas fa-trophy",
              label: "Rank",
              value: userRank || "NA",
            },
            {
              icon: "fas fa-trophy",
              label: "Score",
              value: profile?.score ?? "0",
            },
            {
              icon: "fas fa-gamepad",
              label: "Games Played",
              value: profile?.gamesPlayed ?? "0",
            },
            {
              icon: "fas fa-flag",
              label: "Games Won",
              value: profile?.gamesWon ?? "0",
            },
            {
              icon: "fas fa-clock",
              label: "Hours Played",
              value: profile?.HoursPlayed ?? "0",
            },
          ].map(({ icon, label, value }, i) => (
            <div
              key={i}
              className="flex relative z-10 items-center bg-gray-900 text-sm  p-1 md:p-3 border border-gray-600 rounded-lg shadow-md hover:shadow-[0_6px_8px_rgba(255,255,255,0.2)] transition-shadow duration-300"
            >
              <i className={`${icon} text-gray-400  mr-3`} />
              <span className="text-gray-400 font-semibold mr-2">{label}:</span>
              <span className="text-white font-bold">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileCompA;

import React, { useContext, useEffect, useState } from "react";
import { profileContext } from "../contexts/profileContext";

const ProfileCompA = () => {
  const { userProfile } = useContext(profileContext);
  const [profile, setProfile] = useState(userProfile);

  useEffect(() => {
    setProfile(userProfile);
  }, [userProfile]);

  console.log(profile);

  return (
    <div className="flex flex-col justify-between md:flex-row p-4 pb-0">
      <div className="ml-16">
        <h1 className="text-[5.5vw] font-extrabold text-white">
          @{profile?.username || "Username"}
        </h1>
        <p className="text-gray-500 text-sm text-end mt-[-20px] ml-6 mb-4">
          {profile?.email || "user@example.com"}
        </p>

        <div>
          {/* Score */}
          <div className="flex text-center bg-black border-1 border-white p-1 pl-4 rounded-lg mb-[5px] shadow-[0_4px_6px_rgba(255,255,255,0.1)] hover:shadow-[0_6px_8px_rgba(255,255,255,0.2)] transition-shadow duration-300">
            <i className="fas fa-trophy text-red-600 mr-2 mt-1"></i>
            <span className="text-white mr-2 font-extrabold">Score:</span>
            <span className="text-red-600 font-extrabold">
              {profile?.score ?? "0"}
            </span>
          </div>

          {/* Games Played */}
          <div className="flex text-center bg-black border-1 border-white p-1 pl-4 rounded-lg mb-[5px] shadow-[0_4px_6px_rgba(255,255,255,0.1)] hover:shadow-[0_6px_8px_rgba(255,255,255,0.2)] transition-shadow duration-300">
            <i className="fas fa-gamepad text-blue-600 mr-2 mt-1"></i>
            <span className="text-slate-200 mr-2 font-extrabold">Games Played:</span>
            <span className="text-blue-600 font-extrabold">
              {profile?.gamesPlayed ?? "0"}
            </span>
          </div>

          {/* Games Won */}
          <div className="flex text-center bg-black border-1 border-white p-1 pl-4 rounded-lg mb-[5px] shadow-[0_4px_6px_rgba(255,255,255,0.1)] hover:shadow-[0_6px_8px_rgba(255,255,255,0.2)] transition-shadow duration-300">
            <i className="fas fa-flag text-green-400 mr-2 mt-1"></i>
            <span className="text-slate-200 mr-2 font-extrabold">Games Won:</span>
            <span className="text-green-400 font-extrabold">
              {profile?.gamesWon ?? "0"}
            </span>
          </div>

          {/* Hours Played */}
          <div className="flex text-center bg-black border-1 border-white p-1 pl-4 rounded-lg mb-[5px] shadow-[0_4px_6px_rgba(255,255,255,0.1)] hover:shadow-[0_6px_8px_rgba(255,255,255,0.2)] transition-shadow duration-300">
            <i className="fas fa-clock text-fuchsia-600 mr-2 mt-1"></i>
            <span className="text-slate-200 mr-2 font-extrabold">Hours Played:</span>
            <span className="text-fuchsia-600 font-extrabold">
              {profile?.hoursPlayed ?? "0"}
            </span>
          </div>
        </div>
      </div>

      {/* Profile Picture Section */}
      <div className="relative flex flex-col ml-24 mr-24 items-center justify-start my-auto">
        <div
          style={{
            backgroundImage: profile?.profilePicture
              ? `url(${profile?.profilePicture})`
              : "url('/bg2.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="min-w-[10vw] w-[18vw] h-[18vw] min-h-[10vw] rounded-full border-4 border-[#ffffff] shadow-[0_0_10px_rgba(0,0,0,0.5)] hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]"
        ></div>
      </div>
    </div>
  );
};

export default ProfileCompA;


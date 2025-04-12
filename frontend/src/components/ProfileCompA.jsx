// import React, { useContext, useEffect, useState } from "react";
// import { profileContext } from "../contexts/profileContext";

// const ProfileCompA = () => {
//   const { userProfile ,userRank} = useContext(profileContext);
//   const [profile, setProfile] = useState(userProfile);

//   useEffect(() => {
//     setProfile(userProfile);
//   }, [userProfile]);

//   return (
//     <div className="flex flex-col justify-between md:flex-row p-4 pb-0">
//       <div className="ml-16">
//         <h1 className="text-[5.5vw] font-extrabold text-white">
//           {profile?.username || "Username"}
//         </h1>
//         <br />
//         <p className="text-gray-500 text-sm mt-[-20px] ml-6 mb-4">
//           {profile?.email || "user@example.com"}
//         </p>

//         <div>
//         <div className="flex text-center bg-black p-2 border-1 border-gray-600  pl-4 rounded-lg mb-[5px] shadow-[0_4px_6px_rgba(255,255,255,0.1)] hover:shadow-[0_6px_8px_rgba(255,255,255,0.2)] transition-shadow duration-300">
//             <i className="fas fa-trophy text-gray-400 mr-2 mt-1"></i>
//             <span className="text-gray-400 mr-2 font-extrabold">Rank:</span>
//             <span className="text-white font-extrabold">
//               {userRank ?userRank :"NA"}
//             </span>
//           </div>
//           {/* Score */}
//           <div className="flex text-center bg-black p-2  border-1 border-gray-600 pl-4 rounded-lg mb-[5px] shadow-[0_4px_6px_rgba(255,255,255,0.1)] hover:shadow-[0_6px_8px_rgba(255,255,255,0.2)] transition-shadow duration-300">
//             <i className="fas fa-trophy text-gray-400 mr-2 mt-1"></i>
//             <span className="text-gray-400 mr-2 font-extrabold">Score:</span>
//             <span className="text-white font-extrabold">
//               {profile?.score ?? "0"}
//             </span>
//           </div>

//           {/* Games Played */}
//           <div className="flex text-center bg-black p-2  border-1 border-gray-600  pl-4 rounded-lg mb-[5px] shadow-[0_4px_6px_rgba(255,255,255,0.1)] hover:shadow-[0_6px_8px_rgba(255,255,255,0.2)] transition-shadow duration-300">
//             <i className="fas fa-gamepad text-gray-400 mr-2 mt-1"></i>
//             <span className="text-gray-400 mr-2 font-extrabold">Games Played:</span>
//             <span className="text-white font-extrabold">
//               {profile?.gamesPlayed ?? "0"}
//             </span>
//           </div>

//           {/* Games Won */}
//           <div className="flex text-center bg-black p-2  border-1 border-gray-600  pl-4 rounded-lg mb-[5px] shadow-[0_4px_6px_rgba(255,255,255,0.1)] hover:shadow-[0_6px_8px_rgba(255,255,255,0.2)] transition-shadow duration-300">
//             <i className="fas fa-flag text-gray-400 mr-2 mt-1"></i>
//             <span className="text-gray-400 mr-2 font-extrabold">Games Won:</span>
//             <span className="text-white font-extrabold">
//               {profile?.gamesWon ?? "0"}
//             </span>
//           </div>

//           {/* Hours Played */}
//           <div className="flex text-center bg-black border-1 border-gray-600 p-2 pl-4 rounded-lg mb-[5px] shadow-[0_4px_6px_rgba(255,255,255,0.1)] hover:shadow-[0_6px_8px_rgba(255,255,255,0.2)] transition-shadow duration-300">
//             <i className="fas fa-clock text-gray-400 mr-2 mt-1"></i>
//             <span className="text-gray-400 mr-2 font-extrabold">Hours Played:</span>
//             <span className="text-white font-extrabold">
//               {profile?.hoursPlayed ?? "0"}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Profile Picture Section */}
//       <div className="relative flex flex-col ml-24 mr-24 items-center justify-start my-auto">
//         <div
//           style={{
//             backgroundImage: profile?.profilePicture
//               ? `url(${profile?.profilePicture})`
//               : "url('/bg2.jpg')",
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//           className="min-w-[10vw] w-[20vw] h-[20vw] min-h-[10vw] rounded-full border-1 border-gray-500 shadow-[0_0_10px_rgba(0,0,0,0.5)] hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]"
//         ></div>
//       </div>
//     </div>
//   );
// };

// export default ProfileCompA;




import React, { useContext, useEffect, useState } from "react";
import { profileContext } from "../contexts/profileContext";

const ProfileCompA = () => {
  const { userProfile, userRank } = useContext(profileContext);
  const [profile, setProfile] = useState(userProfile);

  useEffect(() => {
    setProfile(userProfile);
  }, [userProfile]);

  return (
    <div className="flex flex-wrap justify-between items-start p-6 md:p-12 gap-8 bg-black text-white ">
      
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
              {profile?.username || "Username"}
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {profile?.email || "user@example.com"}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="w-full space-y-3">
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
              value: profile?.hoursPlayed ?? "0",
            },
          ].map(({ icon, label, value }, i) => (
            <div
              key={i}
              className="flex items-center bg-black/80 p-3 border border-gray-600 rounded-lg shadow-md hover:shadow-[0_6px_8px_rgba(255,255,255,0.2)] transition-shadow duration-300"
            >
              <i className={`${icon} text-gray-400 mr-3`} />
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

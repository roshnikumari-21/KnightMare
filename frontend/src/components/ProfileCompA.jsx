import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const ProfileCompA = () => {
  return (
    <div className="flex flex-col justify-between md:flex-row p-4 pb-0  ">
      <div className="ml-16">
        <h1 className="text-[5.5vw] font-extrabold text-white">@JohnDoe</h1>
        <p className="text-gray-500 text-sm text-end mt-[-20px] ml-6 mb-4">
          johndoe@example.com
        </p>

        <div >
        <div >
  {/* Score */}
  <div className="flex text-center bg-black  border-1 border-white p-1 pl-4 rounded-lg mb-[5px] shadow-[0_4px_6px_rgba(255,255,255,0.1)] hover:shadow-[0_6px_8px_rgba(255,255,255,0.2)] transition-shadow duration-300">
    <i className="fas fa-trophy text-red-600 mr-2 mt-1"></i> {/* Trophy icon for Score */}
    <span className="text-white mr-2 font-extrabold">Score:</span>
    <span className="text-red-600 font-extrabold">1500</span>
  </div>

  {/* Games Played */}
  <div className="flex text-center bg-black  border-1 border-white p-1 pl-4 rounded-lg mb-[5px] shadow-[0_4px_6px_rgba(255,255,255,0.1)] hover:shadow-[0_6px_8px_rgba(255,255,255,0.2)] transition-shadow duration-300">
    <i className="fas fa-gamepad text-blue-600 mr-2 mt-1"></i> {/* Gamepad icon for Games Played */}
    <span className="text-slate-200 mr-2 font-extrabold">Games Played:</span>
    <span className="text-blue-600 font-extrabold">67</span>
  </div>

  {/* Games Won */}
  <div className="flex text-center bg-black  border-1 border-white p-1 pl-4 rounded-lg mb-[5px] shadow-[0_4px_6px_rgba(255,255,255,0.1)] hover:shadow-[0_6px_8px_rgba(255,255,255,0.2)] transition-shadow duration-300">
    <i className="fas fa-flag text-green-400 mr-2 mt-1"></i> {/* Flag icon for Games Won */}
    <span className="text-slate-200 mr-2 font-extrabold">Games Won:</span>
    <span className="text-green-400 font-extrabold">32</span>
  </div>

  {/* Hours Played */}
  <div className="flex text-center bg-black  border-1 border-white p-1 pl-4 rounded-lg mb-[5px] shadow-[0_4px_6px_rgba(255,255,255,0.1)] hover:shadow-[0_6px_8px_rgba(255,255,255,0.2)] transition-shadow duration-300">
    <i className="fas fa-clock text-fuchsia-600 mr-2 mt-1"></i> {/* Clock icon for Hours Played */}
    <span className="text-slate-200 mr-2 font-extrabold">Hours Played:</span>
    <span className="text-fuchsia-600 font-extrabold">32</span>
  </div>
</div>
</div>
      </div>

      <div className="relative flex flex-col ml-24 mr-24 items-center justify-start my-auto">
        {/* Profile Picture Container */}
        <div
          style={{
            backgroundImage: "url('/bg2.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className=" min-w-[10vw] w-[18vw] h-[18vw] min-h-[10vw] rounded-full border-4 border-[#ffffff] shadow-[0_0_10px_rgba(0,0,0,0.5)] hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]"
        ></div>
        <button className="absolute top-2 right-2 text-white ">
        </button>
      </div>
    </div>
  );
};

export default ProfileCompA;

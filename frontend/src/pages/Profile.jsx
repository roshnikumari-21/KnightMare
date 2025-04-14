import React from "react";
import ProfileCompA from "../components/ProfileCompA";
import HeatMap from "../components/HeatMap";
import ProgressGraph from "../components/ProgressGraph";
import ProfileSettings from "../components/ProfileSettings";

const Profile = () => {
  return (
    <>
  <div className="bg-gray-950 min-h-screen text-white font-sans">
       <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[length:80px_80px] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)]"></div>
      </div>
    <ProfileCompA />
    <HeatMap/>
    <h2 className="text-lg mx-10 md:text-xl  font-extrabold text-white mb-6 border-b-2 border-white">
    Rating Progress
      </h2>
    {/* <h2 className=" text-xl ml-8 mr-14 p-4 font-extrabold text-white  border-b-2 border-white"></h2> */}
    <ProgressGraph/>
    <ProfileSettings/>
    </div>
    </>
  );
};

export default Profile;
import React from "react";
import ProfileCompA from "../components/ProfileCompA";
import HeatMap from "../components/HeatMap";
import ProgressGraph from "../components/ProgressGraph";
import ProfileSettings from "../components/ProfileSettings";

const Profile = () => {
  return (
    <div className="bg-gray-950"
    // style={{
    //   backgroundImage: "url('/bgmodernblack.jpg')",
    //   backgroundSize: "cover",
    //   backgroundRepeat: "repeat",
    //   minHeight: "100vh",
    //   minwidth: "100vw", 
    // }}
    >
    <ProfileCompA />
    <HeatMap/>
    <h2 className="text-lg mx-10 md:text-xl  font-extrabold text-white mb-6 border-b-2 border-white">
    Rating Progress
      </h2>
    {/* <h2 className=" text-xl ml-8 mr-14 p-4 font-extrabold text-white  border-b-2 border-white"></h2> */}
    <ProgressGraph/>
    <ProfileSettings/>
    </div>
  );
};

export default Profile;
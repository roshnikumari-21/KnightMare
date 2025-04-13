import React from "react";
import ProfileCompA from "../components/ProfileCompA";
import HeatMap from "../components/HeatMap";
import ProgressGraph from "../components/ProgressGraph";
import ProfileSettings from "../components/ProfileSettings";

const Profile = () => {
  return (
    <div className="bg-black"
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
    <h2 className="text-xl ml-14 mr-14 p-4 font-extrabold text-white mb-4 border-b-2 border-white">Rating Progress</h2>
    <ProgressGraph/>
    <ProfileSettings/>
    </div>
  );
};

export default Profile;
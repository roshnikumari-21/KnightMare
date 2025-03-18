import React from "react";
import ProfileCompA from "../components/ProfileCompA";

const Profile = () => {
  return (
    <div className="min-h-screen"
      style={{
        backgroundImage: "url('/bgmodernblack.jpg')", 
        backgroundSize: "cover", 
        backgroundPosition: "center", 
        backgroundRepeat: "no-repeat", 
      }}
    >
    <ProfileCompA />
    </div>
  );
};

export default Profile;
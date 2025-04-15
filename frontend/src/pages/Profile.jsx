import React, { useContext, useEffect } from "react";
import ProfileCompA from "../components/ProfileCompA";
import HeatMap from "../components/HeatMap";
import ProgressGraph from "../components/ProgressGraph";
import ProfileSettings from "../components/ProfileSettings";
import { useSearchParams } from 'react-router';
import { commoncontext } from "../contexts/commoncontext";

const Profile = () => {
  const [searchParams , setSearchParams] = useSearchParams();
  const {user , diffuseremail , setDiffuseremail} = useContext(commoncontext);
  const emailofdiffuser = searchParams.get('email');
  setDiffuseremail(emailofdiffuser);
  useEffect(() => {
    return () => {
    setDiffuseremail(null);
    };
  }, []);
  return(
    <>
  <div className="bg-gray-950 min-h-screen text-white font-sans">
       <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[length:80px_80px] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)]"></div>
      </div>
    <ProfileCompA />
    <HeatMap/>
    <h2 className="text-lg mx-4 sm:mx-8 md:mx-14 md:text-xl  font-extrabold text-white mb-6 border-b-2 border-white">
    Rating Progress
      </h2>
    {/* <h2 className=" text-xl ml-8 mr-14 p-4 font-extrabold text-white  border-b-2 border-white"></h2> */}
    <ProgressGraph/>
    {(!emailofdiffuser) ?(<ProfileSettings/>):''}
    <div className="w-full py-4 bg-gradient-to-t from-blue-900/70 to-transparent mt-8 md:mt-16 flex items-center justify-center">
        <p className="text-gray-400 text-xs md:text-sm">
          © {new Date().getFullYear()} Knightmare Chess - All rights reserved
        </p>
      </div>
    </div>
    </>
  );
};

export default Profile;
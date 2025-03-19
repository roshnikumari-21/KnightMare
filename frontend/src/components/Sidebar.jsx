import React, { useState ,useContext } from "react";
import { NavLink ,useNavigate } from "react-router-dom";
import {commoncontext} from "../contexts/commoncontext";


const Sidebar = () => {
  const Navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const { setToken, setUser ,user , token } = useContext(commoncontext);
  console.log(user);
  return (
    <div
      className={`bg-black  shadow-xl transition-all duration-300 ease-in-out ${
        isExpanded ? "w-56" : "w-16"
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* User Profile Section */}
      <div onClick = {() => Navigate('/profile')} className="p-4 cursor-pointer border-b border-gray-700">
        <div className="flex items-center gap-3 overflow-hidden">
          <div style={{
        backgroundImage: `url(${user?.profilePicture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }} className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
          {user?"":"P"}
          </div>
          {isExpanded && (
            <div className="text-white">
              <p className="font-medium">{user ? user.username : "Sign in to see details"}</p>
              <p className="text-xs text-gray-400">{user ? user.email :""}</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="space-y-2 p-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-3 rounded-lg transition-colors duration-200 group ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`
          }
        >
          <svg
            className="w-6 h-6 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span
            className={`transition-opacity duration-200 ${
              isExpanded ? "opacity-100" : "opacity-0"
            }`}
          >
            Home
          </span>
        </NavLink>
        <NavLink
          to="/playWithAI"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-3 rounded-lg transition-colors duration-200 group ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`
          }
        >
          <svg
  className="w-6 h-6 flex-shrink-0"
  fill="none"
  stroke="currentColor"
  viewBox="0 0 24 24"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M5 3l14 9-14 9V3z"
  />
</svg>


          <span
            className={`transition-opacity duration-200 ${
              isExpanded ? "opacity-100" : "opacity-0"
            }`}
          >
            Play
          </span>
        </NavLink>
        <NavLink
          to="/leaderBoard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-3 rounded-lg transition-colors duration-200 group ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`
          }
        >
          <svg
  className="w-6 h-6 flex-shrink-0"
  fill="none"
  stroke="currentColor"
  viewBox="0 0 24 24"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M8 16v4M12 12v8M16 8v12M4 20h16"
  />
</svg>



          <span
            className={`transition-opacity duration-200 ${
              isExpanded ? "opacity-100" : "opacity-0"
            }`}
          >
            LeaderBoard
          </span>
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-3 rounded-lg transition-colors duration-200 group ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`
          }
        >
           <svg
  className="w-6 h-6 flex-shrink-0"
  fill="none"
  stroke="currentColor"
  viewBox="0 0 24 24"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M12 4.5V2m4.95 3.05l1.41-1.41M19.5 12h2m-3.05 4.95l1.41 1.41M12 19.5v2m-4.95-3.05l-1.41 1.41M4.5 12h-2m3.05-4.95l-1.41-1.41M12 8a4 4 0 100 8 4 4 0 000-8z"
  />
</svg>
 
          <span
            className={`transition-opacity duration-200 ${
              isExpanded ? "opacity-100" : "opacity-0"
            }`}
          >
            Settings
          </span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;

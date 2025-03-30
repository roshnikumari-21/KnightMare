import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { commoncontext } from "../contexts/commoncontext";
import { AudioContext } from "../Context/AudioContext";
import { toast } from 'react-toastify';

const Sidebar = () => {
  const Navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const { setToken, setUser, user, token } = useContext(commoncontext);
  const { isPlaying, playAudio, pauseAudio } = useContext(AudioContext);

  const toggleSound = () => {
    if (isPlaying) pauseAudio();
    else playAudio();
  };

  const Logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    toast.success("You have been logged out successfully!");
    Navigate("/");
  };

  return (
    <div
      className={`bg-black shadow-xl transition-all duration-300 ease-in-out ${
        isExpanded ? "w-56" : "w-16"
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* User Profile Section */}
      <div onClick={() => Navigate('/profile')} className="p-4 cursor-pointer border-b border-gray-700">
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
      <nav className="space-y-1 p-2">
        {/* Main Navigation Links */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`
          }
        >
          <svg
            className="w-5 h-5 flex-shrink-0"
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
            `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`
          }
        >
          <svg
            className="w-5 h-5 flex-shrink-0"
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
            `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`
          }
        >
          <svg
            className="w-5 h-5 flex-shrink-0"
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
          to="/analysis"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`
          }
        >
          <svg className="w-5 h-5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <rect x="4" y="4" width="16" height="16" strokeWidth="1.5"/>
            <path d="M4 8h16M4 12h16M4 16h16M8 4v16M12 4v16M16 4v16" strokeWidth="1" strokeOpacity="0.5"/>
            <path 
              strokeWidth="2"
              strokeLinecap="round"
              d="M9 15l3-3m0 0l3 3m-3-3v6"
            />
            <circle cx="18" cy="6" r="1.5" fill="currentColor"/>
          </svg>
          <span
            className={`transition-opacity duration-200 ${
              isExpanded ? "opacity-100" : "opacity-0"
            }`}
          >
            Analysis
          </span>
        </NavLink>
        
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`
          }
        >
          <svg
            className="w-5 h-5 flex-shrink-0"
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

        {/* Mobile-only Navigation Links - Hidden on larger devices */}
        <div className="md:hidden pt-2 mt-2">

          {/* About Us */}
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 rounded-lg transition-colors duration-200 ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`
            }
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span
              className={`transition-opacity duration-200 ${
                isExpanded ? "opacity-100" : "opacity-0"
              }`}
            >
              About Us
            </span>
          </NavLink>

          {/* Contact */}
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`
            }
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span
              className={`transition-opacity duration-200 ${
                isExpanded ? "opacity-100" : "opacity-0"
              }`}
            >
              Contact
            </span>
          </NavLink>

          {/* Login/Logout */}
          {token ? (
            <button
              onClick={Logout}
              className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 w-full text-gray-300 hover:bg-gray-700"
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span
                className={`transition-opacity duration-200 ${
                  isExpanded ? "opacity-100" : "opacity-0"
                }`}
              >
                Logout
              </span>
            </button>
          ) : (
            <button
              onClick={() => Navigate("/login")}
              className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 w-full text-gray-300 hover:bg-gray-700"
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span
                className={`transition-opacity duration-200 ${
                  isExpanded ? "opacity-100" : "opacity-0"
                }`}
              >
                Login
              </span>
            </button>
          )}

<button
            onClick={toggleSound}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 w-full ${
              isPlaying ? "text-blue-400" : "text-gray-300"
            } hover:bg-gray-700`}
          >
            <svg
              className="w-5 h-5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isPlaying ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                />
              ) : (
                <>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                  />
                </>
              )}
            </svg>
            <span
              className={`transition-opacity duration-200 ${
                isExpanded ? "opacity-100" : "opacity-0"
              }`}
            >
              {isPlaying ? 'Sound On' : 'Sound Off'}
            </span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;

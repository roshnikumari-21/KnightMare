import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AudioContext } from "../Context/AudioContext";
import { commoncontext } from "../contexts/commoncontext";
import { toast } from "react-toastify";

const Navbar = () => {
  const Navigate = useNavigate();
  const { isPlaying, playAudio, pauseAudio } = useContext(AudioContext);
  const { user, setUser, token, setToken } = useContext(commoncontext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  const Logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    toast.success("You have been logged out successfully!");
    Navigate("/");
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="flex items-center justify-between px-4 md:px-6 py-[12px] md:py-[8px] sm:py-[10px] bg-black shadow-xl relative z-50">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 hover:opacity-90 transition-opacity"
        >
          <img
            src={assets.logo}
            className="w-[40px] h-[40px] md:w-[40px] md:h-[40px] transition-transform duration-300 hover:scale-110"
            alt="Website Logo"
          />
          <span className="text-xl md:text-xl font-bold text-gray-100 font-poppins tracking-tight">
            KnightMare
          </span>
        </Link>

        {/* Desktop Navigation - Hidden on Mobile */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8 mr-4">
          {/* Sound Toggle Button */}
          <button
            onClick={toggleSound}
            className="flex items-center gap-2 text-base lg:text-lg font-medium px-3 py-1 lg:px-4 lg:py-2 text-gray-300 hover:text-white transition-all duration-300 hover:shadow-glow"
          >
            {isPlaying ? (
              <svg
                className="w-5 h-5 lg:w-6 lg:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 lg:w-6 lg:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
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
              </svg>
            )}
            <span className="hidden lg:inline">
              {isPlaying ? "Sound On" : "Sound Off"}
            </span>
          </button>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-base lg:text-lg font-medium px-3 py-1 lg:px-4 lg:py-2 rounded-lg transition-all duration-300
                            ${
                              isActive
                                ? "text-white border-b-2 border-white font-semibold"
                                : "text-gray-300 hover:text-white hover:shadow-glow"
                            }`
            }
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `text-base lg:text-lg font-medium px-3 py-1 lg:px-4 lg:py-2 rounded-lg transition-all duration-300
                            ${
                              isActive
                                ? "text-white border-b-2 border-white font-semibold"
                                : "text-gray-300 hover:text-white hover:shadow-glow"
                            }`
            }
          >
            Contact
          </NavLink>

          {token ? (
            <div
              className="cursor-pointer bg-slate-900 font-bold rounded-full px-3 py-1 lg:px-3 lg:py-2 border shadow-sm shadow-white border-gray-400 text-white text-sm lg:text-base"
              onClick={Logout}
            >
              Logout
            </div>
          ) : (
            ""
          )}
          {!token ? (
            <div
              className="cursor-pointer bg-slate-800 font-bold rounded-full px-3 py-1 lg:px-4 lg:py-2 border shadow-sm shadow-white border-white text-white text-sm lg:text-base"
              onClick={() => Navigate("/login")}
            >
              Login
            </div>
          ) : (
            ""
          )}
        </div>









        {/* Mobile Hamburger Menu */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>
      {mobileMenuOpen && (
  <div className="md:hidden fixed inset-0 backdrop-blur-2xl mx-auto z-40 pt-18 px-6 overflow-y-auto">
    <div className="flex flex-col items-center space-y-2 text-white text-2xl">
      {token && (
        <>
          {/* User Profile */}
          <div
            onClick={() => {
              Navigate("/profile");
              setMobileMenuOpen(false);
            }}
            className="flex  items-center gap-3 p-4 cursor-pointer w-full justify-center"
          >
            <div
              style={{
                backgroundImage: `url(${user?.profilePicture})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center"
            >
              {user ? "" : "P"}
            </div>
            <div className="text-white">
              <p className="font-medium">
                {user ? user.username : "Sign in to see details"}
              </p>
              <p className="text-sm text-gray-400">
                {user ? user.email : ""}
              </p>
            </div>
          </div>

          {/* Authenticated User Navigation */}
          <NavLink
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `w-full text-center py-3 rounded-lg transition-colors duration-200 ${
                isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/playWithAI"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `w-full text-center py-3 rounded-lg transition-colors duration-200 ${
                isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700"
              }`
            }
          >
            Play
          </NavLink>
          <NavLink
            to="/leaderBoard"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `w-full text-center py-3 rounded-lg transition-colors duration-200 ${
                isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700"
              }`
            }
          >
            LeaderBoard
          </NavLink>
          <NavLink
            to="/analysis"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `w-full text-center py-3 rounded-lg transition-colors duration-200 ${
                isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700"
              }`
            }
          >
            Analysis
          </NavLink>
          <NavLink
            to="/settings"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `w-full text-center py-3 rounded-lg transition-colors duration-200 ${
                isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700"
              }`
            }
          >
            Settings
          </NavLink>
        </>
      )}

      {/* Always visible */}
      <button
        onClick={() => {
          toggleSound();
          setMobileMenuOpen(false);
        }}
        className={`w-full text-center py-3 rounded-lg transition-colors duration-200 ${
          isPlaying ? "text-blue-400" : "text-gray-300"
        } hover:bg-gray-700`}
      >
        {isPlaying ? "Sound On" : "Sound Off"}
      </button>
      <NavLink
        to="/about"
        onClick={() => setMobileMenuOpen(false)}
        className={({ isActive }) =>
          `w-full text-center py-3 rounded-lg transition-colors duration-200 ${
            isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700"
          }`
        }
      >
        About Us
      </NavLink>
      <NavLink
        to="/contact"
        onClick={() => setMobileMenuOpen(false)}
        className={({ isActive }) =>
          `w-full text-center py-3 rounded-lg transition-colors duration-200 ${
            isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700"
          }`
        }
      >
        Contact
      </NavLink>

      {/* Login/Logout */}
      {token ? (
        <button
          onClick={Logout}
          className="w-full text-center py-3 rounded-lg transition-colors duration-200 text-gray-300 hover:bg-gray-700"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={() => {
            Navigate("/login");
            setMobileMenuOpen(false);
          }}
          className="w-full text-center py-3 rounded-lg transition-colors duration-200 text-gray-300 hover:bg-gray-700"
        >
          Login
        </button>
      )}
    </div>
  </div>
)}











      
    </>
  );
};

export default Navbar;

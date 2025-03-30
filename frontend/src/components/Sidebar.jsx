import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { commoncontext } from "../contexts/commoncontext";
import { FaBars, FaTimes } from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(commoncontext);

  return (
    <>
      {/* Hamburger Menu - Visible on Small Screens */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-5 right-5 z-50 text-white bg-black p-3 rounded-lg shadow-lg"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>
  
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-56 bg-black shadow-xl transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out md:relative md:w-56 z-40`}
      >
        {/* User Profile Section */}
        <div
          onClick={() => navigate("/profile")}
          className="p-4 cursor-pointer border-b border-gray-700 flex items-center gap-3"
        >
          <div
            style={{
              backgroundImage: `url(${user?.profilePicture})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center"
          >
            {!user && "P"}
          </div>
          <div className="text-white">
            <p className="font-medium">
              {user ? user.username : "Sign in to see details"}
            </p>
            <p className="text-xs text-gray-400">{user?.email || ""}</p>
          </div>
        </div>
  
        {/* Navigation Links */}
        <nav className="space-y-2 p-2">
          {[
            { to: "/", label: "Home", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
            { to: "/playWithAI", label: "Play", icon: "M5 3l14 9-14 9V3z" },
            { to: "/leaderBoard", label: "LeaderBoard", icon: "M8 16v4M12 12v8M16 8v12M4 20h16" },
            { to: "/analysis", label: "Analysis", icon: "M4 8h16M4 12h16M4 16h16M8 4v16M12 4v16M16 4v16" },
            { to: "/settings", label: "Settings", icon: "M12 4.5V2m4.95 3.05l1.41-1.41M19.5 12h2m-3.05 4.95l1.41 1.41M12 19.5v2m-4.95-3.05l-1.41 1.41M4.5 12h-2m3.05-4.95l-1.41-1.41M12 8a4 4 0 100 8 4 4 0 000-8z" },
          ].map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-lg transition-colors duration-200 group ${
                  isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700"
                }`
              }
              onClick={() => setIsOpen(false)} // Close sidebar on link click
            >
              <svg
                className="w-6 h-6 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-label={label}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
              </svg>
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
  
      {/* Overlay - Close Sidebar on Click (Mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
  
};

export default Sidebar;

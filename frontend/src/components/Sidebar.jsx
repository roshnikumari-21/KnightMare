import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div
      className={`bg-black  shadow-xl transition-all duration-300 ease-in-out ${
        isExpanded ? "w-56" : "w-16"
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* User Profile Section */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
            <span className="text-black text-sm">JD</span>
          </div>
          {isExpanded && (
            <div className="text-white">
              <p className="font-medium">John Doe</p>
              <p className="text-xs text-gray-400">jhondoe100@gmail.com</p>
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
      </nav>
    </div>
  );
};

export default Sidebar;

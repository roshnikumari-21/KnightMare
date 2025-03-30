import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AudioContext } from "../Context/AudioContext";
import { commoncontext } from '../contexts/commoncontext';
import { toast } from 'react-toastify';
 
const Navbar = () => {
    const Navigate = useNavigate();
    const { isPlaying, playAudio, pauseAudio } = useContext(AudioContext);
    const { user, setUser, token, setToken } = useContext(commoncontext);

    const toggleSound = () => {
        if (isPlaying) {
            pauseAudio();
        }
        else {
            playAudio();
        }
    }

    const Logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
        toast.success("You have been logged out successfully!");
        Navigate("/");
    }

    return (
        <nav className="flex items-center justify-between px-4 md:px-8 py-[10px] bg-black shadow-xl">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
                <img
                    src={assets.logo}
                    className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] transition-transform duration-300 hover:scale-110"
                    alt="Website Logo"
                />
                <span className="text-xl md:text-2xl font-bold text-gray-100 font-poppins tracking-tight">
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
                    <span className="hidden lg:inline">{isPlaying ? 'Sound On' : 'Sound Off'}</span>
                </button>

                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        `text-base lg:text-lg font-medium px-3 py-1 lg:px-4 lg:py-2 rounded-lg transition-all duration-300
                        ${isActive ? 'text-white border-b-2 border-white font-semibold' :
                            'text-gray-300 hover:text-white hover:shadow-glow'}`
                    }
                >
                    About Us
                </NavLink>

                <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                        `text-base lg:text-lg font-medium px-3 py-1 lg:px-4 lg:py-2 rounded-lg transition-all duration-300
                        ${isActive ? 'text-white border-b-2 border-white font-semibold' :
                            'text-gray-300 hover:text-white hover:shadow-glow'}`
                    }
                >
                    Contact
                </NavLink>
                <a
                    href="https://github.com/ayushkumarsingh2422005/KnightMare"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-base lg:text-lg font-medium px-3 py-1 lg:px-4 lg:py-2 text-gray-300
                            hover:text-white transition-all duration-300 group hover:shadow-glow"
                >
                    <span className="hidden lg:inline">Code on GitHub</span>
                    <span className="lg:hidden">GitHub</span>
                    <svg
                        className="w-4 h-4 lg:w-5 lg:h-5 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                    </svg>
                </a>
                {token ? <div className="cursor-pointer bg-slate-800 font-bold rounded-full px-3 py-1 lg:px-4 lg:py-2 border shadow-sm shadow-white border-white text-white text-sm lg:text-base" onClick={Logout}>Logout</div> : ""}
                {(!token) ? <div className="cursor-pointer bg-slate-800 font-bold rounded-full px-3 py-1 lg:px-4 lg:py-2 border shadow-sm shadow-white border-white text-white text-sm lg:text-base" onClick={() => Navigate("/login")}>Login</div> : ""}
            </div>
        </nav>
    );
};

export default Navbar;
import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AudioContext } from "../Context/AudioContext";
import { commoncontext } from '../contexts/commoncontext';
import { toast } from 'react-toastify';

const Navbar = () => {
    const navigate = useNavigate();
    const { isPlaying, playAudio, pauseAudio } = useContext(AudioContext);
    const { user, setUser, token, setToken } = useContext(commoncontext);
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleSound = () => {
        isPlaying ? pauseAudio() : playAudio();
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
        toast.success("You have been logged out successfully!");
        navigate("/");
    };

    return (
        <nav className="bg-black shadow-xl px-4 py-3 flex flex-col md:flex-row md:justify-between items-center w-full">
            {/* Top section with buttons and logo */}
            <div className="flex justify-between items-center w-full md:w-auto">
                <button 
                    className="md:hidden text-white text-2xl px-3 py-1" 
                    onClick={() => setIsNavOpen(!isNavOpen)}
                >
                    ☰
                </button>
                
                <Link to="/" className="flex items-center gap-3 mx-auto md:mx-0">
                    <img 
                        src={assets.logo} 
                        className="w-[50px] h-[50px] transition-transform duration-300 hover:scale-110" 
                        alt="Website Logo" 
                    />
                    <span className="text-2xl font-bold text-gray-100 font-poppins tracking-tight">
                        KnightMare
                    </span>
                </Link>
                
                {/* Sidebar trigger with hover */}
                <div className="relative group">
                    <button className="md:hidden text-white text-2xl px-3 py-1">
                        ⋮
                    </button>
                    <div className="absolute top-full right-0 bg-gray-800 p-4 shadow-lg w-40 hidden group-hover:block">
                        <p className="text-white">Sidebar Content</p>
                    </div>
                </div>
            </div>
            
            {/* Navigation Links */}
            <div className={`md:flex flex-col md:flex-row items-center gap-6 md:gap-8 ${isNavOpen ? 'flex' : 'hidden'} w-full md:w-auto`}>
                <button 
                    onClick={toggleSound} 
                    className="flex items-center gap-2 text-lg font-medium px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 hover:shadow-glow"
                >
                    {isPlaying ? '🔊 Sound On' : '🔇 Sound Off'}
                </button>
                
                <NavLink to="/about" className="text-gray-300 hover:text-white text-lg font-medium px-4 py-2">
                    About Us
                </NavLink>
                <NavLink to="/contact" className="text-gray-300 hover:text-white text-lg font-medium px-4 py-2">
                    Contact
                </NavLink>
                <a 
                    href="https://github.com/ayushkumarsingh2422005/KnightMare" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white text-lg font-medium px-4 py-2"
                >
                    Code on GitHub
                </a>
                {token ? 
                    <button 
                        className="bg-slate-800 font-bold rounded-full px-4 py-2 text-white" 
                        onClick={logout}
                    >
                        Logout
                    </button>
                    :
                    <button 
                        className="bg-slate-800 font-bold rounded-full px-4 py-2 text-white" 
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>
                }
            </div>
        </nav>
    );
};

export default Navbar;

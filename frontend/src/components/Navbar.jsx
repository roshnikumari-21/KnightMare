import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between px-8 py-[12px] bg-black shadow-xl">
            <div className="flex items-center gap-4">
                <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
                    <img 
                        src={assets.logo} 
                        className="w-[55px] h-[55px] transition-transform duration-300 hover:scale-110" 
                        alt="Website Logo" 
                    />
                    <span className="text-3xl font-bold text-gray-100 font-poppins tracking-tight">
                        KnightMare
                    </span>
                </Link>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center gap-8 mr-4">
                <NavLink 
                    to="/about" 
                    className={({ isActive }) => 
                        `text-lg font-medium px-4 py-2 rounded-lg transition-all duration-300
                        ${isActive ? 'text-white border-b-2 border-white font-semibold' : 
                        'text-gray-300 hover:text-white hover:shadow-glow'}`
                    }
                >
                    About Us
                </NavLink>
                
                <NavLink 
                    to="/contact" 
                    className={({ isActive }) => 
                        `text-lg font-medium px-4 py-2 rounded-lg transition-all duration-300
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
                    className="flex items-center gap-2 text-lg font-medium px-4 py-2 text-gray-300
                            hover:text-white transition-all duration-300 group hover:shadow-glow"
                >
                    <span>Code on GitHub</span>
                    <svg 
                        className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
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
            </div>
        </nav>
    );
};

export default Navbar;
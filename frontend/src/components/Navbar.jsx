import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between px-8 py-6 bg-white shadow-sm">
            {/* Left side - Logo & Site Name */}
            <div className="flex items-center gap-4">
                <Link to="/" className="flex items-center gap-3">
                    <img 
                        src={assets.logo} 
                        className="w-12 h-12 transition-transform duration-300 hover:scale-105" 
                        alt="Website Logo" 
                    />
                    <span className="text-3xl font-bold text-gray-800 font-poppins">
                        ChessMaster
                    </span>
                </Link>
            </div>

            {/* Right side - Navigation Links */}
            <div className="flex items-center gap-8">
                <NavLink 
                    to="/about" 
                    className={({ isActive }) => 
                        `text-lg font-medium px-4 py-2 rounded-lg transition-all duration-300
                        ${isActive ? 'text-blue-600 border-b-2 border-blue-600' : 
                        'text-gray-600 hover:text-blue-500 hover:border-b-2 hover:border-blue-500'}`
                    }
                >
                    About Us
                </NavLink>
                
                <NavLink 
                    to="/contact" 
                    className={({ isActive }) => 
                        `text-lg font-medium px-4 py-2 rounded-lg transition-all duration-300
                        ${isActive ? 'text-blue-600 border-b-2 border-blue-600' : 
                        'text-gray-600 hover:text-blue-500 hover:border-b-2 hover:border-blue-500'}`
                    }
                >
                    Contact
                </NavLink>

                <a 
                    href="https://github.com/yourusername/yourrepo" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-lg font-medium px-4 py-2 text-gray-600
                            hover:text-blue-500 transition-colors duration-300 group"
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
import React,{useContext} from 'react';
import { Link,  NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AudioContext } from "../Context/AudioContext";
import { commoncontext } from '../contexts/commoncontext';
import { toast } from 'react-toastify';
 
const Navbar = () => {
    const Navigate = useNavigate();
    const { isPlaying, playAudio, pauseAudio } = useContext(AudioContext);
    const {user,setUser , token , setToken} = useContext(commoncontext)
    const toggleSound=()=>{
        if(isPlaying){
          pauseAudio();
        }
        else{
          playAudio();
        }
      }
      const Logout = () =>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    toast.success("You have been logged out successfully!");
    Navigate("/");}

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

                        {/* Sound Toggle Button */}
        <button 
          onClick={toggleSound} 
          className="flex items-center gap-2 text-lg font-medium px-4 py-2 text-gray-300
                  hover:text-white transition-all duration-300 hover:shadow-glow"
        >
          {isPlaying ? (
            <svg 
              className="w-6 h-6" 
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
              className="w-6 h-6" 
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
          <span>{isPlaying ? 'Sound On' : 'Sound Off'}</span>
        </button>
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
                {token?<div className="bg-slate-800 font-bold rounded-full px-4 py-2 border  shadow-sm shadow-white border-white text-white" onClick={Logout}>Logout</div>:""}
            </div>
        </nav>
    );
};

export default Navbar;
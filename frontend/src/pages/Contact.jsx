import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { 
  FaChessKnight, 
  FaChessQueen, 
  FaChessBoard, 
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

import { commoncontext } from "../contexts/commoncontext";


export default function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", Feedback: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { token, user, showNavbar, setShowNavbar } = useContext(commoncontext);
  
  useEffect(() => {
    setShowNavbar(true);
  }, [setShowNavbar]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (token) {
        const response = await axios.post(`${backendUrl}/api/auth/sendFeedback`, formData);
        if (response.data.success) {
          toast.success("Message sent successfully!");
          setFormData({ name: "", email: "", Feedback: "" });
        } else {
          toast.error(response.data.message || "Failed to send message.");
        }
      } else {
        toast.error("Please login before sending a message");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-950 to-gray-950 text-white py-16 px-4 sm:px-0 pb-0 overflow-hidden relative">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[length:80px_80px] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)]"></div>
      </div>

           <div className="max-w-7xl mx-auto relative z-10 h-full flex flex-col">
        {/* Header section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center mb-4 relative">
            <motion.div
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{ duration: 1 }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="absolute -left-6 -top-6"
            >
              <FaChessKnight className="text-blue-500 text-5xl opacity-20" />
            </motion.div>
            <FaChessBoard className="text-blue-500 text-4xl mr-3" />
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              Contact Us
            </h1>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Make your move and reach out to us. We're always ready to play our part in your success.
          </motion.p>
        </motion.div>

        {/* Centered message box */}
        <div className="flex-1 flex items-center justify-center mb-12">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-2xl"
          >
            <motion.div 
              variants={itemVariants}
              className="bg-gray-800/70 backdrop-blur-md rounded-xl p-8 shadow-2xl border border-gray-700 relative overflow-hidden"
            >
              {/* Chess board border */}
              <div className="absolute inset-0 border-8 border-dashed border-gray-700/30 rounded-xl pointer-events-none"></div>
              
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <FaChessKnight className="text-blue-500 mr-2" /> Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div variants={itemVariants}>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition hover:border-blue-400/50"
                    placeholder="Enter your name"
                    required
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Your Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition hover:border-blue-400/50"
                    placeholder="Enter your email"
                    required
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="Feedback" className="block text-sm font-medium text-gray-300 mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="Feedback"
                    name="Feedback"
                    value={formData.Feedback}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition hover:border-blue-400/50"
                    placeholder="Your strategic message..."
                    required
                  ></textarea>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg font-semibold text-white shadow-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center ${isSubmitting ? 'opacity-70' : ''} relative overflow-hidden group`}
                  >
                    <span className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaChessQueen className="mr-2 transition-transform group-hover:scale-110" /> 
                        <span className="relative">
                          Send Message
                          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                        </span>
                      </>
                    )}
                  </button>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        </div>
        <motion.div 
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.5, duration: 0.8 }}
  className="mt-auto"
>
</motion.div>
      </div>
      <div className="hidden md:block">
                <motion.div 
                  animate={{ 
                    x: [0, 100, 0],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 8,
                    ease: "easeInOut"
                  }}
                  className="absolute top-1/4 left-10 text-4xl opacity-20 text-blue-300"
                >
                  ♜
                </motion.div>
                <motion.div 
                  animate={{ 
                    y: [0, 50, 0],
                    rotate: [0, -15, 15, 0]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 7,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                  className="absolute bottom-1/3 right-20 text-4xl opacity-20 text-blue-300"
                >
                  ♛
                </motion.div>
              </div>
       {/* Footer */}
     
 <div className="w-full py-4 bg-gradient-to-t from-blue-900/70 to-transparent mt-8 md:mt-16 flex items-center justify-center">
        <p className="text-gray-400 text-xs md:text-sm">
          © {new Date().getFullYear()} Knightmare Chess - All rights reserved
        </p>
      </div> 
    </div>
      </>
    
  );
}
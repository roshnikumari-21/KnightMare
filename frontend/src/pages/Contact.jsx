




import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaChessKnight, FaChessQueen, FaChessBoard, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { commoncontext } from "../contexts/commoncontext";

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", Feedback: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { token, user, showNavbar, setShowNavbar } = useContext(commoncontext);
  setShowNavbar(true);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-4">
            <FaChessBoard className="text-blue-500 text-4xl mr-3" />
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
              Contact Us
            </h1>
          </div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Make your move and reach out to us. We're always ready to play our part in your success.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 shadow-2xl border border-gray-700">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <FaChessKnight className="text-blue-500 mr-2" /> Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Your Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label htmlFor="Feedback" className="block text-sm font-medium text-gray-300 mb-1">
                  Your Message
                </label>
                <textarea
                  id="Feedback"
                  name="Feedback"
                  value={formData.Feedback}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Your strategic message..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg font-semibold text-white shadow-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center ${isSubmitting ? 'opacity-70' : ''}`}
              >
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
                    <FaChessQueen className="mr-2" /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 shadow-2xl">
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <FaChessBoard className="text-blue-500 mr-2" /> Contact Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-500/20 p-3 rounded-lg">
                    <FaEnvelope className="text-blue-400 text-xl" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-200">Email</h3>
                    <p className="text-gray-400">contact@chessmaster.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-500/20 p-3 rounded-lg">
                    <FaPhone className="text-blue-400 text-xl" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-200">Phone</h3>
                    <p className="text-gray-400">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-500/20 p-3 rounded-lg">
                    <FaMapMarkerAlt className="text-blue-400 text-xl" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-200">Address</h3>
                    <p className="text-gray-400">123 Chess Avenue, Grandmaster City, GM 12345</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 shadow-2xl">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <FaChessKnight className="text-blue-500 mr-2" /> Chess Hours
              </h2>
              <div className="space-y-2 text-gray-300">
                <p className="flex justify-between"><span>Monday - Friday</span> <span>9:00 AM - 6:00 PM</span></p>
                <p className="flex justify-between"><span>Saturday</span> <span>10:00 AM - 4:00 PM</span></p>
                <p className="flex justify-between"><span>Sunday</span> <span>Closed (Studying chess strategies)</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
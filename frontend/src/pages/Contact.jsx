import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaGhost, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { commoncontext } from "../contexts/commoncontext";

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", Feedback: "" });
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const {token,user,showNavbar , setShowNavbar} = useContext(commoncontext);
     setShowNavbar(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    try {
    
      if(token){const response = await axios.post(`${backendUrl}/api/auth/sendFeedback`, formData);
      if (response.data.success) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" }); 
            } else {
        toast.error(response.data.message || "Failed to send message.");
      }}
      else{
        toast.error("Please Login Before sending message");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };
  return (
    <div
      style={{
        backgroundImage: "url('chessfloor2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="backdrop-blur-sm text-white flex flex-col items-center justify-center p-5"
    >
      <h1 className="text-4xl mb-3 flex items-center">Contact Us</h1>
      <div className="backdrop-blur-sm p-6 rounded-lg shadow-xl w-full max-w-lg">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            placeholder="Enter your Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 border mb-2 border-white rounded focus:outline-none"
            required
          />
          <input
            placeholder="Enter your Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="p-2 mt-4 border border-white rounded focus:outline-none"
            required
          />

          <label className="mt-4 mb-2 text-white">Your Message</label>
          <textarea
            name="Feedback"
            value={formData.Feedback}
            onChange={handleChange}
            rows="4"
            className="p-2 border border-white rounded focus:outline-none"
            required
          />
          <button type="submit" className="mt-4 p-2 bg-black hover:bg-slate-900 rounded text-white font-bold">
            Send Your Message
          </button>
        </form>
      </div>
    </div>
  );
}

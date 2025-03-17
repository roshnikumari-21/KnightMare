import { useState } from "react";
import { FaGhost, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your haunted message has been sent!");
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-6 spooky-font">
      <h1   style={{ fontFamily: "'Creepster', cursive" }} className="text-4xl text-red-600 mb-4 flex items-center">
        Contact The Haunted Keep
      </h1>
      <p className="text-gray-400 mb-6">Reach out if you dare... We are waiting in the shadows.</p>

      <div className="bg-transparent p-6 rounded-lg shadow-xl w-full max-w-lg ">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="mb-2 text-white">Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="p-2  border border-white rounded focus:outline-none" required />

          <label className="mt-4 mb-2 text-white">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="p-2  border border-white rounded focus:outline-none" required />

          <label className="mt-4 mb-2 text-white">Your Message</label>
          <textarea name="message" value={formData.message} onChange={handleChange} rows="4" className="p-2  border border-white rounded focus:outline-none" required />

          <button type="submit" className="mt-6 p-3 bg-red-700 hover:bg-red-800 rounded text-white font-bold">Send Your Message to the Abyss</button>
        </form>
      </div>

      <div className="mt-8 text-gray-400">
        <p className="flex items-center"><FaMapMarkerAlt className="mr-2 text-red-500" /> The Haunted Tower, Darkwood</p>
        <p className="flex items-center mt-2"><FaPhone className="mr-2 text-red-500" /> +666-666-6666</p>
        <p className="flex items-center mt-2"><FaEnvelope className="mr-2 text-red-500" /> ghost@knightmare.com</p>
      </div>
    </div>
  );
}
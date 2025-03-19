import React from 'react';
import { motion } from 'framer-motion';
import {FaMedal} from "react-icons/fa";
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Leaderboard = () => {
  return (
    <div className="bg-black text-white min-h-screen p-4">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl   font-bold text-center mb-20"
      >
        Leaderboard
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6  mb-8">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-gray-800 threed relative   w-4/5 ml-8 p-4  mr-6 rounded-lg"
        >
             <FontAwesomeIcon icon={faTrophy} className="text-gray-400 text-3xl mb-2" />
          <h2 className="text-xl font-semibold">Daily</h2>
          <p className="text-gray-400">Skulldugger</p>
          <p className="text-gray-400">Earn 500 points</p>
          <p className="text-gray-400">5,000 Prize</p>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-slate-900 shiftdown threed  ml-6 p-6 mr-6 rounded-lg"
        >
            <FontAwesomeIcon icon={faTrophy} className="text-yellow-300 text-5xl mb-2" />
          <h2 className="text-2xl  font-semibold">Magnus</h2>
          <p className="text-gray-400">Kiaxon</p>
          <p className="text-gray-400">Earned 1500 points</p>         
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-gray-800 threed ml-6 p-4 mr-8 rounded-lg"
        >
            <FontAwesomeIcon icon={faTrophy} className="text-orange-500 text-3xl mb-2" />
          <h2 className="text-xl font-semibold">Ultralex</h2>
          <p className="text-gray-400">Earn 250 points</p>
          <p className="text-gray-400">2,500 Prize</p>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-gray-800 p-4 rounded-lg mb-8"
      >
        <p className="text-gray-400">You earned $0 today and are ranked – out of 13868 users</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8"
      >
        <h2 className="text-2xl font-bold mb-4">Top Users</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 rounded-lg">
            <thead>
              <tr>
                <th className="px-4 py-2">Place</th>
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">Points</th>
                <th className="px-4 py-2">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700">
                <td className="px-4 py-2">4</td>
                <td className="px-4 py-2">Protesian</td>
                <td className="px-4 py-2">158</td>
                <td className="px-4 py-2">780</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="px-4 py-2">5</td>
                <td className="px-4 py-2">Protesian</td>
                <td className="px-4 py-2">158</td>
                <td className="px-4 py-2">780</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="px-4 py-2">6</td>
                <td className="px-4 py-2">Protesian</td>
                <td className="px-4 py-2">158</td>
                <td className="px-4 py-2">780</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Leaderboard;
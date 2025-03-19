import React from 'react';
import { motion } from 'framer-motion';
import {FaMedal} from "react-icons/fa";
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Leaderboard = () => {

    const users = [
        { "id": 1, "username": "Magnus", "score": 1580, "best": 5000  },
        { "id": 2, "username": "GrandmasterX", "score": 1450, "best": 4800 },
        { "id": 3, "username": "ChessWarrior", "score": 1300, "best": 4600 },
        { "id": 4, "username": "StrategicKnight", "score": 1200, "best": 4400 },
        { "id": 5, "username": "TacticalPawn", "score": 1100, "best": 4200 },
        { "id": 6, "username": "Pyari Chudail", "score": 1000, "best": 4000 },
        { "id": 7, "username": "Pyara Papita", "score": 900, "best": 3800 },
        { "id": 8, "username": "Pyari Billi", "score": 850, "best": 3600 },
        { "id": 9, "username": "MightyRook", "score": 800, "best": 3400 },
        { "id": 10, "username": "EndgameMaster", "score": 750, "best": 3200 },
        { "id": 11, "username": "KnightKing", "score": 700, "best": 3000 },
        { "id": 12, "username": "BlitzChampion", "score": 650, "best": 2800 },
        { "id": 13, "username": "CheckmateQueen", "score": 600, "best": 2600 },
        { "id": 14, "username": "BishopSlayer", "score": 550, "best": 2400 },
        { "id": 15, "username": "PawnMaster", "score": 500, "best": 2200 },
        { "id": 16, "username": "TacticalMind", "score": 450, "best": 2000 },
        { "id": 17, "username": "KingDefender", "score": 400, "best": 1800 },
        { "id": 18, "username": "QueenGambit", "score": 350, "best": 1600 },
        { "id": 19, "username": "RookDestroyer", "score": 300, "best": 1400 },
        { "id": 20, "username": "EndgameWizard", "score": 250, "best": 1200 }
    ];
    
      



  return (
    <div className="bg-black text-white min-h-screen p-4">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1. }}
        className="text-3xl   font-bold text-center mb-20"
      >
        Leaderboard
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6  mb-8">
        <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0 }}
          whileHover={{ scale: 1.05 }}
          className="bg-gray-800 threed relative flex flex-col items-center justify-center   ml-8 p-3  mr-6 rounded-lg"
        >
             <div
          style={{
            backgroundImage: "url('/bg2.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="  min-w-[7vw] w-[7vw] h-[7vw] min-h-7vw] rounded-lg   shadow-[0_0_10px_rgba(0,0,0,0.5)] hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]"
        ></div>
        <h2 className="text-xl mb-3 font-semibold">Daily</h2>
              <div className='bg-gray-400 border-white w-fit p-2 rounded-lg '> <FontAwesomeIcon icon={faTrophy} className="text-gray-600 text-2xl " /></div>
          
          <p>Rank:2</p>     
          <p className="text-gray-400">Earned 500 points</p>
         
        </motion.div>

        <motion.div 
         initial={{ opacity: 0, y: -20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 1.0 }}
          whileHover={{ scale: 1.05 }}
          className="bg-slate-900 shiftdown threed  flex flex-col items-center justify-center ml-6 p-4 mr-6 rounded-lg"
        >
             <div
          style={{
            backgroundImage: "url('/bg2.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className=" min-w-[7vw] w-[7vw] h-[7vw] min-h-7vw] rounded-lg   shadow-[0_0_10px_rgba(0,0,0,0.5)] hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]"
        ></div>
             <h2 className="text-2xl mb-3 font-semibold">Magnus</h2>
        <div className='bg-yellow-300 border-white w-fit p-2 rounded-lg '> <FontAwesomeIcon icon={faTrophy} className="text-yellow-600 text-2xl " /></div>
         
        <p>Rank:1</p>     
          <p className="text-gray-400">Earned 1500 points</p>  
            

        </motion.div>

        <motion.div 
         initial={{ opacity: 0, y: -20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 1.0 }}
          whileHover={{ scale: 1.05 }}
          className="bg-gray-800 threed flex flex-col items-center justify-center ml-6 p-3 mr-8 rounded-lg"
        >
             <div
          style={{
            backgroundImage: "url('/bg2.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className=" min-w-[7vw] w-[7vw] h-[7vw] min-h-7vw] rounded-lg   shadow-[0_0_10px_rgba(0,0,0,0.5)] hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]"
        ></div>
         <h2 className="text-xl mb-3 font-semibold">Ultralex</h2>
          <div className='bg-yellow-700 border-white w-fit p-2 rounded-lg '> <FontAwesomeIcon icon={faTrophy} className="text-yellow-900 text-2xl " /></div>
          <p>Rank:3</p>     
          <p className="text-gray-400">Earned 250 points</p>
        
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-gray-800 p-2 rounded-lg mb-8"
      >
         <p className=" text-center">You earned 140 today and are ranked 25 out of 578 users</p>
        
      </motion.div>

      <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, delay: 0.4 }}
      className="mt-8"
    >
      <h2 className="text-2xl text-center font-bold mb-4">Top Users</h2>
      <div className="overflow-x-auto flex justify-center">
        <table className="w-11/12 bg-gray-900 rounded-lg">
          <thead>
            <tr className="font-bold border-black border-4">
              <td className="px-4 py-2">Rank</td>
              <td className="px-4 py-2">Username</td>
              <td className="px-4 py-2">Score</td>
              <td className="px-4 py-2">Highest Score</td>
              <td className="px-4 py-2">Total Hours</td>
              <td className="px-4 py-2">Streak</td>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user.id} className="border-black border-4">
                    
                  <td className="px-4 py-2"><FontAwesomeIcon icon={faTrophy} className="text-blue-900 text " /> {index + 1}</td>
                  <td className="px-4 py-2 flex items-center space-x-2">
        <img src="/useravatar.png" alt="Profile" className="w-8 bg-black h-8 rounded-full" />
        <span>{user.username}</span>
      </td>
                  <td className="px-4 py-2">{user.score}</td>
                  <td className="px-4 py-2">{user.best}</td>
                  <td className="px-4 py-2">{user.score}</td>
                  <td className="px-4 py-2">{user.best}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-400">Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>

     

      
    </div>
  );
};

export default Leaderboard;

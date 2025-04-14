import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { commoncontext } from '../contexts/commoncontext';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import { profileContext } from '../contexts/profileContext';
import { useNavigate } from 'react-router';

const Leaderboard = () => {
  const { setShowNavbar, backendUrl, token ,user } = useContext(commoncontext);
  const realuser = user;
  const { userRank,userProfile } = useContext(profileContext);
  setShowNavbar(true);
  const navigate = useNavigate();
  const [topUsers, setTopUsers] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastrank, setlastrank] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    totalUsers: 0,
    totalPages: 1
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      await fetchTopUsers();
      await fetchLeaderboard();
    };
    fetchInitialData();
  }, [pagination.page]);

  const fetchTopUsers = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/auth/leaderboard`, {
        params: {
          page: 1,
          limit: 3
        },
        headers: {
          token: token
        }
      });
      setTopUsers(response.data.data);
    } catch (err) {
      console.error("Error fetching top users:", err);
      setTopUsers([]);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/api/auth/leaderboard`, {
        params: {
          page: pagination.page,
          limit: pagination.limit
        },
        headers: {
          token: token
        }
      });
      setLeaderboard(response.data.data);
      setPagination({
        ...pagination,
        totalUsers: response.data.pagination.totalUsers,
        totalPages: response.data.pagination.totalPages
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch leaderboard');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination({ ...pagination, page: newPage });
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;




  return (
    <div className="bg-gray-950 min-h-screen text-white font-sans">
    <div className="absolute inset-0 opacity-5 pointer-events-none">
     <div className="absolute inset-0 bg-[length:80px_80px] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)]"></div>
   </div>
    <div className="bg-gray-950 text-white min-h-screen p-4 md:p-8">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-2xl  md:text-4xl font-bold text-center mb-6 md:mb-12"
      >
        Leaderboard
      </motion.h1>

      {/* Top 3 Users - Compact Mobile Version */}
      <div className="grid grid-cols-3 sm:grid-cols-3 relative z-10 gap-3 md:gap-6 mb-6 md:mb-8">
        {/* 2nd Place */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
          whileHover={{ scale: 1.03 }}
          className="bg-gray-800 relative z-10 rounded-lg p-2 md:p-4 flex flex-col items-center
          shadow-lg shadow-blue-500/30 hover:shadow-blue-400/50
          transition-shadow duration-300"
        >
          {topUsers[1] && (
            <>
              <div
              onClick={()=>navigate(`/profile?email=${topUsers[1].email}`)}
                style={{
                  backgroundImage: `url(${topUsers[1].profilePicture})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className=" cursor-pointer w-12 h-12 md:w-24 md:h-24 rounded-lg shadow hover:shadow-white/20 transition-shadow"
              ></div>
              <h2 className="text-sm md:text-xl mt-1 md:mt-2 font-medium  md:font-semibold text-center truncate max-w-full">
                {topUsers[1].username}
              </h2>
              <div className='bg-gray-400 mt-1 md:mt-2 p-1 md:p-2 rounded-lg'>
                <FontAwesomeIcon icon={faTrophy} className="text-gray-600 text-sm md:text-2xl" />
              </div>
              <p className="text-xs md:text-base mt-0.5">Rank: 2</p>     
              <p className="text-gray-400 text-xs md:text-base">Score: {topUsers[1].score}</p>
            </>
          )}
        </motion.div>

        {/* 1st Place */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
          whileHover={{ scale: 1.03 }}
          className="bg-gray-800 rounded-lg p-2 md:p-4 flex flex-col items-center
          shadow-lg shadow-blue-500/30 hover:shadow-blue-400/50
          transition-shadow duration-300"
        >
          {topUsers[0] && (
            <>
              <div
              onClick={()=>navigate(`/profile?email=${topUsers[0].email}`)}
                style={{
                  backgroundImage: `url(${topUsers[0].profilePicture})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className="cursor-pointer w-14 h-14 md:w-28 md:h-28 rounded-lg shadow hover:shadow-yellow-300/30 transition-shadow"
              ></div>
              <h2 className="text-base md:text-2xl mt-1 md:mt-3 font-medium md:font-semibold text-center truncate max-w-full">
                {topUsers[0].username}
              </h2>
              <div className='bg-yellow-300 mt-1 md:mt-3 p-1 md:p-2 rounded-lg'>
                <FontAwesomeIcon icon={faTrophy} className="text-yellow-600 text-sm md:text-2xl" />
              </div>
              <p className="text-xs md:text-base mt-0.5">Rank: 1</p>     
              <p className="text-gray-400 text-xs md:text-base">Score: {topUsers[0].score}</p>
            </>
          )}
        </motion.div>

        {/* 3rd Place */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
          whileHover={{ scale: 1.03 }}
          className="bg-gray-800 rounded-lg p-2 md:p-4 flex flex-col items-center
          shadow-lg shadow-blue-500/30 hover:shadow-blue-400/50
          transition-shadow duration-300"
        >
          {topUsers[2] && (
            <>
              <div
                onClick={()=>navigate(`/profile?email=${topUsers[2].email}`)}
                style={{
                  backgroundImage: `url(${topUsers[2].profilePicture})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className="cursor-pointer w-12 h-12 md:w-24 md:h-24 rounded-lg 
              
             transition-all duration-300"
              ></div>
              <h2 className="text-sm md:text-xl mt-1 md:mt-2 font-medium md:font-semibold text-center truncate max-w-full">
                {topUsers[2].username}
              </h2>
              <div className='bg-yellow-700 mt-1 md:mt-2 p-1 md:p-2 rounded-lg'>
                <FontAwesomeIcon icon={faTrophy} className="text-yellow-900 text-sm md:text-2xl" />
              </div>
              <p className="text-xs md:text-base mt-0.5">Rank: 3</p>     
              <p className="text-gray-400 text-xs md:text-base">Score: {topUsers[2].score}</p>
            </>
          )}
        </motion.div>
      </div>

      {/* User Rank Banner */}
      {userRank && (
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gray-800 relative z-10 p-2 md:p-3 rounded-lg mb-4 md:mb-8 text-center text-xs md:text-base"
        >
          You have <span className="font-bold">{realuser.score}</span> points and are ranked 
          <span className="font-bold"> {userRank}</span> out of {pagination.totalUsers} users
        </motion.div>
      )}

      {/* Full Leaderboard Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.4 }}
        className="mt-4 relative z-10 md:mt-8"
      >
        <h2 className="text-lg md:text-2xl text-center font-bold mb-3 md:mb-4">Top Users</h2>
        <div className="overflow-x-auto">
          <div className="min-w-full inline-block align-middle">
            <table className="min-w-full bg-gray-900 rounded-lg overflow-hidden">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-2 py-1 md:px-4 md:py-3 text-left text-xs md:text-sm font-semibold">Rank</th>
                  <th className="px-2 py-1 md:px-4 md:py-3 text-left text-xs md:text-sm font-semibold">Username</th>
                  <th className="px-2 py-1 md:px-4 md:py-3 text-left text-xs md:text-sm font-semibold">Score</th>
                  <th className="px-2 py-1 md:px-4 md:py-3 text-left text-xs md:text-sm font-semibold hidden sm:table-cell">Games Won</th>
                  <th className="px-2 py-1 md:px-4 md:py-3 text-left text-xs md:text-sm font-semibold hidden sm:table-cell">Streak</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.length > 0 ? (
                  leaderboard
                    .sort((a, b) => b.score - a.score)
                    .map((user, index, arr) => {
                      let rank = (index === 0) ? lastrank : (arr[index - 1].score === user.score) ? arr[index - 1].rank : arr[index - 1].rank + 1;
                      user.rank = rank;
                      return (
                        <tr 
                          key={user._id} 
                          className={`border-b border-gray-800 ${(user.username === realuser.username) ? 'bg-cyan-900/50' : 'bg-slate-900/50 hover:bg-gray-800'}`}
                        >
                          <td className="px-2 py-1 md:px-4 md:py-3 whitespace-nowrap">
                            <FontAwesomeIcon icon={faTrophy} className="text-blue-900 mr-1 text-xs md:text-base" /> {rank}
                          </td>
                          <td onClick={()=>navigate(`/profile?email=${user.email}`)} className="px-2 cursor-pointer py-1 md:px-4 md:py-3 whitespace-nowrap">
                            <div className="flex items-center space-x-1 md:space-x-2">
                              <img 
                                src={user.profilePicture} 
                                className="w-5 h-5 md:w-8 md:h-8 rounded-full bg-black" 
                                alt={user.username}
                              />
                              <span className="text-xs md:text-base truncate max-w-[80px] md:max-w-none">{user.username}</span>
                            </div>
                          </td>
                          <td className="px-2 py-1 md:px-4 md:py-3 whitespace-nowrap text-xs md:text-base">{user.score}</td>
                          <td className="px-2 py-1 md:px-4 md:py-3 whitespace-nowrap text-xs md:text-base hidden sm:table-cell">
                            {(user.gamesWon)}
                          </td>
                          <td className="px-2 py-1 md:px-4 md:py-3 whitespace-nowrap text-xs md:text-base hidden sm:table-cell">
                            {user.longestStreak}
                          </td>
                        </tr>
                      );
                    })
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center p-3 text-gray-400 text-sm md:text-base">No users found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination - Responsive */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-3 md:mt-4 space-y-1 md:space-y-0">
          <div className="text-xs md:text-sm text-gray-400">
            Page {pagination.page} of {pagination.totalPages}
          </div>
          <div className="flex space-x-1 md:space-x-2">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className={`px-2 py-0.5 md:px-3 md:py-1 text-xs md:text-sm rounded ${
                pagination.page === 1 ? 'bg-gray-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              Prev
            </button>
            
            {/* Show limited page numbers on mobile */}
            {Array.from({ length: Math.min(3, pagination.totalPages) }, (_, i) => {
              let pageNum;
              if (pagination.totalPages <= 3) {
                pageNum = i + 1;
              } else if (pagination.page <= 2) {
                pageNum = i + 1;
              } else if (pagination.page >= pagination.totalPages - 1) {
                pageNum = pagination.totalPages - 2 + i;
              } else {
                pageNum = pagination.page - 1 + i;
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-2 py-0.5 md:px-3 md:py-1 text-xs md:text-sm rounded ${
                    pagination.page === pageNum ? 'bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
              className={`px-2 py-0.5 md:px-3 md:py-1 text-xs md:text-sm rounded ${
                pagination.page === pagination.totalPages ? 'bg-gray-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </motion.div>
    </div>
    <div className="w-full py-4 bg-gradient-to-t from-blue-900/70 to-transparent mt-8 md:mt-16 flex items-center justify-center">
        <p className="text-gray-400 text-xs md:text-sm">
          © {new Date().getFullYear()} Knightmare Chess - All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Leaderboard;
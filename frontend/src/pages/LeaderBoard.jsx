import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { commoncontext } from '../contexts/commoncontext';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import { profileContext } from '../contexts/profileContext';

const Leaderboard = () => {
  const { setShowNavbar, backendUrl, token } = useContext(commoncontext);
  const { userProfile, userRank } = useContext(profileContext);
  setShowNavbar(true);
  const [topUsers,setTopUsers] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastrank,setlastrank] = useState(1);
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
    <div className="bg-black background-grid text-white min-h-screen p-4">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-3xl font-bold text-center mb-20"
      >
        Leaderboard
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
          whileHover={{ scale: 1.05 }}
          className="bg-gray-800 threed relative flex flex-col items-center justify-center ml-8 p-3 mr-6 rounded-lg"
        >
          <div
            style={{
              backgroundImage: `url(${topUsers[1].profilePicture})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="min-w-[7vw] w-[7vw] h-[7vw] min-h-[7vw] rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.5)] hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]"
          ></div>
          <h2 className="text-xl mb-3 font-semibold">{topUsers[1].username}</h2>
          <div className='bg-gray-400 border-white w-fit p-2 rounded-lg'>
            <FontAwesomeIcon icon={faTrophy} className="text-gray-600 text-2xl" />
          </div>
          <p>Rank: 2</p>     
          <p className="text-gray-400">Earned {topUsers[1].score} points</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
          whileHover={{ scale: 1.05 }}
          className="bg-slate-900 shiftdown threed flex flex-col items-center justify-center ml-6 p-4 mr-6 rounded-lg"
        >
          <div
            style={{
              backgroundImage: `url(${topUsers[0].profilePicture})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="min-w-[7vw] w-[7vw] h-[7vw] min-h-[7vw] rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.5)] hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]"
          ></div>
          <h2 className="text-2xl mb-3 font-semibold">{topUsers[0].username}</h2>
          <div className='bg-yellow-300 border-white w-fit p-2 rounded-lg'>
            <FontAwesomeIcon icon={faTrophy} className="text-yellow-600 text-2xl" />
          </div>
          <p>Rank: 1</p>     
          <p className="text-gray-400">Earned {topUsers[0].score} points</p>
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
              backgroundImage: `url(${topUsers[2].profilePicture})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="min-w-[7vw] w-[7vw] h-[7vw] min-h-[7vw] rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.5)] hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]"
          ></div>
          <h2 className="text-xl mb-3 font-semibold">{topUsers[2].username}</h2>
          <div className='bg-yellow-700 border-white w-fit p-2 rounded-lg'>
            <FontAwesomeIcon icon={faTrophy} className="text-yellow-900 text-2xl" />
          </div>
          <p>Rank: 3</p>     
          <p className="text-gray-400">Earned {topUsers[2].score} points</p>
        </motion.div>
      </div>

      {userRank && (
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gray-800 p-2 rounded-lg mb-8"
        >
          <p className="text-center">
            You have {userProfile.score} score and are ranked {userRank} out of {pagination.totalUsers} users
          </p>
        </motion.div>
      )}

      {/* Full Leaderboard Table */}
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
                <td className="px-4 py-2">Total Hours</td>
                <td className="px-4 py-2">Streak</td>
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
          <tr key={user._id} className={`border-black ${(userProfile.username === user.username) ? 'bg-cyan-500' : 'bg-slate-900'} border-4`}>
            <td className="px-4 py-2">
              <FontAwesomeIcon icon={faTrophy} className="text-blue-900" /> {rank}
            </td>
            <td className="px-4 py-2 flex items-center space-x-2">
              <img 
                src={user.profilePicture} 
                className="w-8 bg-black h-8 rounded-full" 
              />
              <span>{user.username}</span>
            </td>
            <td className="px-4 py-2">{user.score}</td>
            <td className="px-4 py-2">{user.gamesPlayed * 0.5}</td>
            <td className="px-4 py-2">{user.currentStreak}</td>
          </tr>
        );
      })
  ) : (
    <tr>
      <td colSpan="5" className="text-center p-4 text-gray-400">Loading...</td>
    </tr>
  )}
</tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
            className={`px-3 py-1 rounded-md ${pagination.page === 1 ? 'bg-gray-200 text-black cursor-not-allowed' : 'bg-blue-500 text-black hover:bg-blue-600'}`}
          >
            Previous
          </button>
          {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
            let pageNum;
            if (pagination.totalPages <= 5) {
              pageNum = i + 1;
            } else if (pagination.page <= 3) {
              pageNum = i + 1;
            } else if (pagination.page >= pagination.totalPages - 2) {
              pageNum = pagination.totalPages - 4 + i;
            } else {
              pageNum = pagination.page - 2 + i;
            }
            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-3 py-1 rounded-md ${pagination.page === pageNum ? 'bg-blue-600 text-black' : 'bg-blue-500 text-black hover:bg-blue-600'}`}
              >
                {pageNum}
              </button>
            );
          })}
          <button
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.totalPages}
            className={`px-3 py-1 rounded-md ${pagination.page === pagination.totalPages ? 'bg-gray-200 text-black cursor-not-allowed' : 'bg-blue-500 text-black hover:bg-blue-600'}`}
          >
            Next
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Leaderboard;
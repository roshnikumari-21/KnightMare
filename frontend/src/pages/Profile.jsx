




import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { subDays, format } from "date-fns";
import "./heatmap.css"; // Import custom styles

const ProfilePage = () => {
  // Dummy User Data (Replace with real data later)
  const user = {
    username: "ChessMaster",
    email: "chessmaster@example.com",
    profilePicture: "/useravatar.png",
    score: 1450,
    gamesPlayed: 120,
    gamesWon: 65,
    gamesLost: 45,
    gamesDrawn: 10,
    longestStreak: 15,
    currentStreak: 3,
    dailyActivity: [...Array(365)].map((_, i) => ({
      date: format(subDays(new Date(), i), "yyyy-MM-dd"),
      count: Math.floor(Math.random() * 5),
    })),
  };

  
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center p-6">
        {/* Profile Card */}
        <div className="bg-gray-900 shadow-lg rounded-lg p-6 flex flex-col items-center w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
          <img
            src={user.profilePicture}
            alt="Profile"
            className="w-32 h-32 bg-black rounded-full border-4 border-gray-700"
          />
          <h2 className="text-2xl font-bold mt-4">{user.username}</h2>
          <p className="text-gray-400">{user.email}</p>
          <p className="mt-2 text-lg font-semibold">Rating: {user.score}</p>
        </div>
  
        {/* Stats Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
          <div className="bg-gray-800 text-center p-4 rounded-lg">Games Played: <span className="font-bold">{user.gamesPlayed}</span></div>
          <div className="bg-green-700 text-center p-4 rounded-lg">Wins: <span className="font-bold">{user.gamesWon}</span></div>
          <div className="bg-red-700 text-center p-4 rounded-lg">Losses: <span className="font-bold">{user.gamesLost}</span></div>
          <div className="bg-gray-700 text-center p-4 rounded-lg">Draws: <span className="font-bold">{user.gamesDrawn}</span></div>
          <div className="bg-yellow-600 text-center p-4 rounded-lg">Longest Streak: <span className="font-bold">{user.longestStreak}</span></div>
          <div className="bg-blue-600 text-center p-4 rounded-lg">Current Streak: <span className="font-bold">{user.currentStreak}</span></div>
        </div>
  
        {/* Heatmap Section */}
        <div className="mt-8 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 text-center">
          <h3 className="text-xl font-semibold mb-4">Daily Activity</h3>
          <div className="bg-gray-900 p-4 rounded-lg">
            <CalendarHeatmap
              startDate={subDays(new Date(), 365)}
              endDate={new Date()}
              values={user.dailyActivity}
              classForValue={(value) => {
                if (!value) return "color-empty";
                return `color-scale-${value.count}`;
              }}
            />
          </div>
        </div>
      </div>
    );
  };
  
  export default ProfilePage;
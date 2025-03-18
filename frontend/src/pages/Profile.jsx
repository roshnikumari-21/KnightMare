import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth(); // Fetch user data from context
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    profilePicture: "",
    score: 0,
    gamesPlayed: 0,
    gamesWon: 0,
    gamesLost: 0,
    gamesDrawn: 0,
    longestStreak: 0,
    currentStreak: 0,
    ratingHistory: [],
    dailyActivity: [],
  });

  // Fetch user data (replace with your API call)
  useEffect(() => {
    if (user) {
      setProfile({
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        score: user.score,
        gamesPlayed: user.gamesPlayed,
        gamesWon: user.gamesWon,
        gamesLost: user.gamesLost,
        gamesDrawn: user.gamesDrawn,
        longestStreak: user.longestStreak,
        currentStreak: user.currentStreak,
        ratingHistory: user.ratingHistory,
        dailyActivity: user.dailyActivity,
      });
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-8 font-sans">
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
          User Profile
        </h1>

        {/* Profile Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
          <div className="flex flex-col items-center space-y-4">
            <img
              src={profile.profilePicture}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-gray-200"
            />
            <h2 className="text-2xl font-semibold text-gray-800">
              {profile.username}
            </h2>
            <p className="text-gray-600">{profile.email}</p>
          </div>
        </div>

        {/* Game Statistics Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Game Statistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard label="Total Score" value={profile.score} />
            <StatCard label="Games Played" value={profile.gamesPlayed} />
            <StatCard label="Games Won" value={profile.gamesWon} />
            <StatCard label="Games Lost" value={profile.gamesLost} />
            <StatCard label="Games Drawn" value={profile.gamesDrawn} />
            <StatCard label="Longest Streak" value={profile.longestStreak} />
            <StatCard label="Current Streak" value={profile.currentStreak} />
          </div>
        </div>

        {/* Rating History Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Rating History
          </h2>
          <div className="space-y-4">
            {profile.ratingHistory.map((entry, index) => (
              <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-700">
                  {new Date(entry.date).toLocaleDateString()}
                </span>
                <span className="text-gray-900 font-semibold">{entry.score}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Activity Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Daily Activity
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {profile.dailyActivity.map((date, index) => (
              <div
                key={index}
                className="p-2 bg-green-100 text-green-800 text-center rounded-lg"
              >
                {new Date(date).toLocaleDateString()}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable StatCard Component
const StatCard = ({ label, value }) => (
  <div className="bg-gray-50 p-6 rounded-lg shadow-sm text-center">
    <h3 className="text-lg font-semibold text-gray-700">{label}</h3>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
  </div>
);

export default Profile;
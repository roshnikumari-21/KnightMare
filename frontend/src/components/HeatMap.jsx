import React, { useContext, useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { profileContext } from "../contexts/profileContext";

const HeatMap = () => {
  const { userProfile } = useContext(profileContext);
  const [profile, setProfile] = useState(userProfile);

  useEffect(() => {
    setProfile(userProfile);
  }, [userProfile]);

  const dailyActivityMap = profile?.DailyActivityMap || [];
  const gameDates = dailyActivityMap.map(entry => new Date(entry.date)).sort((a, b) => a - b);
  const firstGameDate = gameDates.length > 0 ? gameDates[0] : new Date();
  const lastGameDate = gameDates.length > 0 ? gameDates[gameDates.length - 1] : new Date();
  const oneYearAgo = new Date(lastGameDate);
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const startDate = firstGameDate < oneYearAgo ? firstGameDate : oneYearAgo;
  const endDate = lastGameDate;

  return (
    <div className="ml-14 mr-14 mt-14 mb-8 shadow-xl shadow-black">
      <h2 className="text-xl font-extrabold text-white mb-4 border-b-2 border-white">
        Daily Activity
      </h2>
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={dailyActivityMap}
        classForValue={(value) => {
          if (!value) return "color-empty";
          return `color-scale-${Math.min(value.count, 4)}`;
        }}
        tooltipDataAttrs={(value) => {
          if (!value || !value.date) return {};
          return {
            "data-tooltip": `${value.date}: ${value.count} game${value.count === 1 ? "" : "s"}`,
          };
        }}
      />
      
      {/* Streak Info */}
      <div className="flex text-center bg-black border border-1 border-white p-3 pl-8 rounded-lg mt-6 shadow-[0_4px_6px_rgba(255,255,255,0.1)] hover:shadow-[0_6px_8px_rgba(255,255,255,0.2)] transition-shadow duration-300">
        {/* Longest Streak */}
        <div className="flex items-center mr-8">
          <i className="fas fa-fire text-yellow-500 mr-2 mt-1"></i>
          <span className="text-white mr-2 font-extrabold">Longest Streak:</span>
          <span className="text-yellow-500 font-extrabold">{profile?.longestStreak ?? 0} Days</span>
        </div>

        {/* Current Streak */}
        <div className="flex items-center">
          <i className="fas fa-fire text-green-500 mr-2 mt-1"></i>
          <span className="text-white mr-2 font-extrabold">Current Streak:</span>
          <span className="text-green-500 font-extrabold">{profile?.currentStreak ?? 0} Days</span>
        </div>
      </div>
    </div>
  );
};

export default HeatMap;


import React, { useContext, useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { profileContext } from "../contexts/profileContext";

const HeatMap = () => {
  const { userProfile } = useContext(profileContext);
  const [profile, setProfile] = useState(userProfile);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    setProfile(userProfile);
  }, [userProfile]);

  useEffect(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    
    if (selectedYear === currentYear) {
      // For current year: show last 365 days
      const oneYearAgo = new Date(now);
      oneYearAgo.setDate(oneYearAgo.getDate() - 364); // 364 days = 365 days inclusive
      setStartDate(oneYearAgo);
      setEndDate(now);
    } else {
      // For past years: show full calendar year
      const yearStart = new Date(selectedYear, 0, 1); // January 1
      const yearEnd = new Date(selectedYear, 11, 31); // December 31
      setStartDate(yearStart);
      setEndDate(yearEnd);
    }
  }, [selectedYear]);

  const dailyActivityMap = profile?.DailyActivityMap || [];
  
  const filteredActivities = dailyActivityMap.filter(activity => {
    const activityDate = new Date(activity.date);
    return (
      activityDate >= startDate && 
      activityDate <= endDate
    );
  });

  const getAvailableYears = () => {
    const years = new Set();
    const now = new Date();
    years.add(now.getFullYear()); // Always include current year
    
    dailyActivityMap.forEach(activity => {
      const activityYear = new Date(activity.date).getFullYear();
      years.add(activityYear);
    });
    
    return Array.from(years).sort((a, b) => b - a); // Sort descending (newest first)
  };

  const availableYears = getAvailableYears();

  return (
    <div className="mx-4 sm:mx-8 md:mx-14 mb-8 shadow-xl shadow-black">
      <div className="flex justify-between items-center mb-4 border-b-2 border-white">
        <h2 className="text-lg md:text-xl font-extrabold text-white">
          Daily Activity
        </h2>
        
        <div className="flex items-center">
          <label htmlFor="year-select" className="text-gray-300 mr-2 text-sm md:text-base">
            View:
          </label>
          <select
            id="year-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="bg-gray-800 text-white rounded px-2 py-1 text-sm md:text-base border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value={new Date().getFullYear()}>Last 365 Days</option>
            {availableYears.filter(year => year !== new Date().getFullYear()).map(year => (
              <option key={year} value={year}>
                {year} (Full Year)
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="w-full overflow-x-auto scrollbar-hide">
        <div className="min-w-[1000px]">
          <CalendarHeatmap
            startDate={startDate}
            endDate={endDate}
            values={filteredActivities}
            classForValue={(value) => {
              if (!value) return "color-empty";
              return `color-scale-${Math.min(value.count, 4)}`;
            }}
            tooltipDataAttrs={(value) => {
              if (!value?.date) return {};
              return {
                "data-tooltip": `${value.date}: ${value.count} game${value.count === 1 ? "" : "s"}`,
              };
            }}
          />
        </div>
      </div>

      {/* Streak Info (unchanged) */}
      <div className="text-sm font-semibold flex flex-col md:flex-row justify-between bg-gray-900 border border-gray-400 p-2 md:p-2 rounded-lg mt-6 gap-2 md:gap-0 shadow-[0_4px_6px_rgba(255,255,255,0.1)] hover:shadow-[0_6px_8px_rgba(255,255,255,0.2)] transition-shadow duration-300">
        <div className="flex items-center justify-start md:mr-6">
          <i className="fas fa-fire text-gray-400 mr-2 mt-1"></i>
          <span className="text-gray-400 mr-2 font-bold md:font-extrabold">Longest Streak:</span>
          <span className="text-white font-bold md:font-extrabold">
            {profile?.longestStreak ?? 0} Days
          </span>
        </div>
        <div className="flex items-center justify-start">
          <i className="fas fa-fire text-gray-400 mr-2 mt-1"></i>
          <span className="text-gray-400 mr-2 font-bold md:font-extrabold">Current Streak:</span>
          <span className="text-white font-bold md:font-extrabold">
            {profile?.currentStreak ?? 0} Days
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeatMap;

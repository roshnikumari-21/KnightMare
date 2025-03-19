import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

const HeatMap = ({ dailyActivity }) => {
  const generateDummyData = () => {
    const startDate = new Date("2023-01-01");
    const endDate = new Date("2023-12-31");
    const dummyData = [];

    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
      const formattedDate = date.toISOString().split("T")[0];
      const count = Math.floor(Math.random() * 5);
      dummyData.push({ date: formattedDate, count });
    }

    return dummyData;
  };

  const dummyData = generateDummyData();

  const transformData = (activity) => {
    const activityMap = {};
    activity.forEach((date) => {
      const formattedDate = new Date(date).toISOString().split("T")[0];
      activityMap[formattedDate] = (activityMap[formattedDate] || 0) + 1;
    });

    return Object.keys(activityMap).map((date) => ({
      date,
      count: activityMap[date],
    }));
  };

  const heatmapData = dummyData;

  return (
    <div className="ml-14 mr-14 mt-14 mb-8 shadow-xl shadow-black">
      <h2 className="text-xl font-extrabold text-white mb-4 border-b-2 border-white">
        Daily Activity
      </h2>
      <CalendarHeatmap
        startDate={new Date("2023-01-01")}
        endDate={new Date("2023-12-31")}
        values={heatmapData}
        classForValue={(value) => {
          if (!value) {
            return "color-empty";
          }
          return `color-scale-${Math.min(value.count, 4)}`;
        }}
        tooltipDataAttrs={(value) => {
          if (!value || !value.date) {
            return {};
          }
          return {
            "data-tooltip": `${value.date}: ${value.count} game${value.count === 1 ? "" : "s"}`,
          };
        }}
      />
      <div className="flex text-center bg-black border border-1 border-white p-3 pl-8 rounded-lg mt-6 shadow-[0_4px_6px_rgba(255,255,255,0.1)] hover:shadow-[0_6px_8px_rgba(255,255,255,0.2)] transition-shadow duration-300">
  {/* Longest Streak */}
  <div className="flex items-center mr-8">
    <i className="fas fa-fire text-yellow-500 mr-2 mt-1"></i> {/* Fire icon for Longest Streak */}
    <span className="text-white mr-2 font-extrabold">Longest Streak:</span>
    <span className="text-yellow-500 font-extrabold">365 Days</span>
  </div>

  {/* Current Streak */}
  <div className="flex items-center">
    <i className="fas fa-fire text-green-500 mr-2 mt-1"></i> {/* Fire icon for Current Streak */}
    <span className="text-white mr-2 font-extrabold">Current Streak:</span>
    <span className="text-green-500 font-extrabold">365 Days</span>
  </div>
</div>

    </div>
  );
};

export default HeatMap;
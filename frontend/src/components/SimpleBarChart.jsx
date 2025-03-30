import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SimpleBarChart = ({ data }) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold text-white">Games <span className=" text-red-500">Won</span> Per Level</h2>
      <ResponsiveContainer height={200}>
        <BarChart
          data={data}
          margin={{ top: 30 ,left :-30}}
        >
          <XAxis
            dataKey="name"
            axisLine={{ stroke: "#FFFFFF" }}
            tickLine={{ stroke: "#FFFFFF" }}
            tick={{ fill: "#FFFFFF" }}
          />
          <YAxis
            axisLine={{ stroke: "#FFFFFF" }}
            tickLine={{ stroke: "#FFFFFF" }}
            tick={{ fill: "#FFFFFF" }}
          />
          <Bar
            dataKey="wins"
            fill="#FFFFFF"
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
export default SimpleBarChart;

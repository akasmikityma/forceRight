import React, { useEffect, useState } from "react";
import axios from "axios";

const getColor = (count: number) => {
  if (count <= 0) return "#eeeeee"; // Light gray for no activity
  if (count < 3) return "#c6e48b";
  if (count < 6) return "#7bc96f";
  if (count < 9) return "#239a3b";
  return "#196127"; // Dark green for max activity
};

const CalendarHeatmap: React.FC = () => {
  const [heatmapData, setHeatmapData] = useState<Record<string, number>>({});

  const backEnd_url = "https://forceright-backend-1.onrender.com";
  // const dev_url = "http://localhost:8080";

  const getTracksByDate = async () => {
    try {
      const response = await axios.get(`${backEnd_url}/prtracks/getBydate`, { withCredentials: true });
      const tracksState = response.data.tracks;

      // Transform API response into { "YYYY-MM-DD": count } format
      const transformedData: Record<string, number> = {};
      tracksState.forEach((entry: any) => {
        const date = new Date(entry.createdAt).toISOString().split("T")[0]; // YYYY-MM-DD format
        transformedData[date] = (transformedData[date] || 0) + (entry._count?.id || 0);
      });

      console.log("Transformed Data:", transformedData);
      setHeatmapData(transformedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getTracksByDate();
  }, []);

  // Generate dates for the last 6 months
  const generateDateArray = () => {
    const dates = [];
    const today = new Date();
    for (let i = 180; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      const dateString = date.toISOString().split("T")[0];
      dates.push(dateString);
    }
    return dates;
  };

  const dates = generateDateArray();

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
    <h2 className="text-center font-semibold mb-2">Problem Solving Heatmap</h2>
    <div className="grid grid-rows-7 grid-flow-col gap-1 overflow-x-auto">
      {dates.map((date) => (
        <div
          key={date}
          title={`${date}: ${heatmapData[date] || 0} problems solved`}
          className="w-6 h-6 border rounded-sm"
          style={{ backgroundColor: getColor(heatmapData[date] || 0) }}
        />
      ))}
    </div>
  </div>
  );
};

export default CalendarHeatmap;


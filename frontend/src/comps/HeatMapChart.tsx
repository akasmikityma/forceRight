import React, { useEffect, useState } from "react";
import axios from "axios";
// import { ResponsiveContainer, Tooltip } from "recharts";

// Type definition for HeatmapEntry
// type HeatmapEntry = {
//   date: string;
//   count: number;
// };

// Heatmap color scale function
const getColor = (count: number) => {
  if (count <= 0) return "#eeeeee"; // Light gray for no activity
  if (count < 3) return "#c6e48b";
  if (count < 6) return "#7bc96f";
  if (count < 9) return "#239a3b";
  return "#196127"; // Dark green for max activity
};

const CalendarHeatmap: React.FC = () => {
  const [heatmapData, setHeatmapData] = useState<Record<string, number>>({});

  const getTracksByDate = async () => {
    try {
      const response = await axios.get("https://forceright-backend-1.onrender.com/prtracks/getBydate", { withCredentials: true });
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

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { startOfWeek, addDays, format, eachDayOfInterval } from "date-fns";

// // Type for heatmap entries
// type HeatmapEntry = Record<string, number>;

// // Heatmap color scale function
// const getColor = (count: number) => {
//   if (count <= 0) return "#eeeeee"; // Light gray for no activity
//   if (count < 3) return "#c6e48b";  // Light green
//   if (count < 6) return "#7bc96f";  // Medium green
//   if (count < 9) return "#239a3b";  // Dark green
//   return "#196127"; // Darkest green for max activity
// };

// const CalendarHeatmap: React.FC = () => {
//   const [heatmapData, setHeatmapData] = useState<HeatmapEntry>({});
//   const [maxCount, setMaxCount] = useState(0);

//   useEffect(() => {
//     const getTracksByDate = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/prtracks/getBydate", { withCredentials: true });
//         const tracksState = response.data.tracks;

//         // Transform API response into { "YYYY-MM-DD": count } format
//         const transformedData: HeatmapEntry = {};
//         let max = 0;
        
//         tracksState.forEach((entry: any) => {
//           const date = new Date(entry.createdAt).toISOString().split("T")[0]; // YYYY-MM-DD format
//           transformedData[date] = (transformedData[date] || 0) + (entry._count?.id || 0);
//           max = Math.max(max, transformedData[date]);
//         });

//         console.log("Transformed Data:", transformedData);
//         setHeatmapData(transformedData);
//         setMaxCount(max);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     getTracksByDate();
//   }, []);

//   // Generate the last 6 months of dates
//   const today = new Date();
//   const startDate = startOfWeek(addDays(today, -180), { weekStartsOn: 0 });

//   const dates = eachDayOfInterval({
//     start: startDate,
//     end: today,
//   });

//   return (
//     <div className="p-4 bg-white shadow-md rounded-lg">
//       <h2 className="text-center font-semibold mb-2">Problem Solving Heatmap</h2>
//       <div className="grid grid-cols-52 gap-1">
//         {Array.from({ length: 52 }).map((_, weekIdx) => (
//           <div key={weekIdx} className="flex flex-col gap-1">
//             {Array.from({ length: 7 }).map((_, dayIdx) => {
//               const date = format(dates[weekIdx * 7 + dayIdx] || new Date(), "yyyy-MM-dd");
//               return (
//                 <div
//                   key={date}
//                   title={`${date}: ${heatmapData[date] || 0} problems solved`}
//                   className="w-3 h-3 rounded-sm"
//                   style={{ backgroundColor: getColor(heatmapData[date] || 0) }}
//                 />
//               );
//             })}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CalendarHeatmap;

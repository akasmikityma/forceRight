
import React, { useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";
import { AverageTimePerTag } from "@/store/atoms";
import { useRecoilValue } from "recoil";

const CustomBar = (props: any) => {
  const { x, y, width, height, payload } = props;
  return <rect x={x} y={y} width={width} height={height} fill={payload.color} />;
};

const BarChartComponent: React.FC = () => {
  const timeperTag = useRecoilValue(AverageTimePerTag);
  useEffect(()=>{
    console.log(`timePerTag`,timeperTag);
  })
  return (
    <div className="w-full max-w-6xl mx-auto mt-6 p-4 border items-center justify-center rounded-lg shadow-md">
          <h2 className="font-bold text-lg text-center mb-4">Time Spent on Each Tag</h2>
          <div>
            <ResponsiveContainer width="100%" height={450}>
              <BarChart data={timeperTag} margin={{ top: 20, right: 50, left: 50, bottom: 50 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-30} textAnchor="end" />
                <YAxis label={{ value: "avgTime", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                {/* Removed Legend */}
                    <Legend 
                    formatter={() => {
                        return ""; 
                    }}
                />
                <Bar dataKey="avgTime" shape={<CustomBar />} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
  );
};

export default BarChartComponent;


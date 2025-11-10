import { useEffect } from "react";
import { 
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer 
} from "recharts";
import { ProblemsByRating } from "@/store/atoms";
import { useRecoilValue } from "recoil";

export default function RatingChart() {
  const RatingWIthProbs = useRecoilValue(ProblemsByRating);
  useEffect(()=>{
    console.log(`ratingsWithPROBS : `,RatingWIthProbs)
  })
  return (
    <div className="w-full h-[400px] p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold text-center mb-2">Performance Rating Progress</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={RatingWIthProbs}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" stroke="#8884d8" />
          <YAxis domain={[1, 5]} stroke="#8884d8" />
          <Tooltip />
          <Line type="monotone" dataKey="rating" stroke="#4f46e5" strokeWidth={3} dot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}


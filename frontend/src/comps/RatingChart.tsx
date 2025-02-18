import { useEffect } from "react";
// import axios from "axios";
import { 
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer 
} from "recharts";
import { ProblemsByRating } from "@/store/atoms";
import { useRecoilValue } from "recoil";
// Function to convert rating from text to number
// const ratingMap: Record<string, number> = {
//   ONE: 1,
//   TWO: 2,
//   THREE: 3,
//   FOUR: 4,
//   FIVE: 5,
// };

export default function RatingChart() {
  // const [ratingData, setRatingData] = useState([]);
  const RatingWIthProbs = useRecoilValue(ProblemsByRating);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3000/prtracks/getRatings");
  //       console.log("ratingsData:", response.data.rating_data);

  //       const formattedData = response.data.rating_data.map((item: any) => ({
  //         date: new Date(item.createdAt).toISOString().split("T")[0], // Format as YYYY-MM-DD
  //         rating: ratingMap[item.rating] || 0, // Convert rating string to number
  //       }));
  //       console.log(formattedData);
  //       setRatingData(formattedData);
  //     } catch (error) {
  //       console.error("Error fetching rating data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  useEffect(()=>{
    // console.log(`ratIng DATA`,ratingData);
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

// change domain >> [1,5]
// calculate average rating of all the tracks of a day >> 


import  { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// import PocketInfo from '../comps/PocketInfo';
import { allCards } from '../CardsData';
// import ProblemTagTimeChart from '../comps/Samplegraph';
// import { ProblemTagTimeData } from '../comps/Samplegraph';
import {SampleChart} from '../comps/SampleChart'
import { allTracks,CombinedTracks } from '@/store/atoms';
import { useRecoilValue ,useRecoilState} from 'recoil';
import axios from "axios";
import { Editor } from '@monaco-editor/react';
import { TrackInterface } from '@/store/atoms';
import DifficultyStats from '@/comps/DifficultyDist';
import StreakComp from '@/comps/StreakComp';
import MostStruggled from '@/comps/MostStruggled';

const Card = ({ card, isActive,id }:{card:TrackInterface,isActive:any,id:number}) => {
  const cardRef = useRef(null);
  const nav = useNavigate();
  const trackOnClickHandler =()=>{
    nav(`/track/${id}`);
    
  }

  useEffect(() => {
    if (cardRef.current) {
      // @ts-ignore
      cardRef.current.style.transition =
        'transform 0.5s ease-in-out, opacity 0.5s ease-in-out, scale 0.5s ease-in-out';
    }
  }, [isActive]);

  return (
    <div
    ref={cardRef}
    className={`absolute w-full md:w-2/3 sm:w-full max-w-2xl rounded-2xl shadow-2xl transition-all duration-500 ease-in-out backdrop-blur-lg bg-opacity-70 hover:scale-105 hover:shadow-[0px_0px_30px_rgba(255,204,0,0.6)] hover:translate-y-[-5px] hover:rotate-[1deg] ${
      isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
    }`}
    style={{
      transform: isActive ? 'translateX(0%)' : 'translateX(110%)',
      zIndex: isActive ? allCards.length : 0,
      background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
      border: '2px solid rgba(255, 255, 255, 0.2)',
    }}
    onClick={(e)=>e.stopPropagation()}
  >
    <div className="border-2 border-yellow-400 rounded-2xl p-6 h-[400px] flex flex-col justify-between relative bg-gradient-to-br from-lime-200 to-lime-50 shadow-lg hover:from-lime-300 hover:to-yellow-100 transition-all duration-500"
     onClick={trackOnClickHandler} >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-orange-700 drop-shadow-lg tracking-wide">🚀 Recently Solved Problems</h2>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800 underline decoration-orange-500 transition-colors duration-300 hover:text-yellow-600">
          {card.problemLink}
        </h3>
        <div className="p-3 rounded-lg shadow-md border border-gray-600 overflow-hidden bg-gray-900 transition-all duration-500 hover:shadow-[0px_0px_20px_rgba(255,255,255,0.5)] hover:scale-105">
          <Editor
            value={card.implementations[0]}
            height="30vh"
            theme="vs-dark"
            className="rounded-lg"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              scrollBeyondLastLine: false,
            }}
          />
        </div>
      </div>
    </div>
  </div>
  

  );
};

const AnotherHome = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  
  const alltheTracks = useRecoilValue(allTracks);
  const [dbtracks,setdbTracks] = useState([]);
  
  // const [combinedTracks, setCombinedTracks] = useState<TrackInterface[]>([]);
  const [combinedTracks,setCombinedTracks] = useRecoilState(CombinedTracks);
  // const [totalSolved, setTotalSolved] = useState({
  //     name: 'Problems Solved',
  //     count: 270,
  //   });

  
    const getTracksFrom_Db = async () => {
      try {
        const response = await axios.get("https://forceright-bnd.onrender.com/prtracks/mytracks", { withCredentials: true });
        const tracks_db = response.data.tracks;
        setdbTracks(tracks_db);
        console.log("Fetched from DB:", tracks_db);
      } catch (error) {
        console.error("Error fetching tracks from DB:", error);
      }
    };
    
    useEffect(() => {
      getTracksFrom_Db();
    }, []);

  // const goToPreviousCard = () => {
  //   setCurrentCardIndex((prevIndex) => (prevIndex - 1 + alltheTracks.length) % alltheTracks.length);
  // };

  // const goToNextCard = () => {
  //   setCurrentCardIndex((prevIndex) => (prevIndex + 1) % alltheTracks.length);
  // };
 
  useEffect(()=>{
    console.log(alltheTracks);
  },[alltheTracks])

  useEffect(() => {
    const trackMap = new Map();
    [...dbtracks, ...alltheTracks].forEach((track) => {
      trackMap.set(track.id, track);
    });
  
    setCombinedTracks(Array.from(trackMap.values())); // ✅ Updating state
    console.log(`combined Tracks : `,combinedTracks)
  }, [dbtracks, alltheTracks]);

  const goToPreviousCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + combinedTracks.length) % combinedTracks.length);
  };

  const goToNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % combinedTracks.length);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 overflow-y-auto">
      {/* ... other parts of the component */}
      <div className="h-32 bg-white shadow-lg shadow-black p-4 flex justify-around items-center "> {/* Increased height */}
        <DifficultyStats
        />
       <StreakComp/>
        <MostStruggled/>
      </div>

      <div className="flex-grow h- flex justify-center items-center bg-green-100 relative overflow-hidden p-8"
      onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative w-full md:w-11/12 md:h-3/4  max-h-[600px]  h-full flex items-center justify-center"
        >
          {combinedTracks.map((card, index) => (
            <Card key={index} card={card} isActive={index === currentCardIndex} id={card.id} />
          ))}
        </div>
        <button onClick={goToPreviousCard} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-300 rounded-full p-2">
          &lt;
        </button>
        <button onClick={goToNextCard} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-300 rounded-full p-2">
          &gt;
        </button>
      </div>
   
      {/* ... other parts of the component */}
      <div className="flex h-48 flex-row justify-around p-4">
  <div className="h-[200px] w-full md:w-1/2 lg:w-1/3">
    {/* Chart is responsive and smaller */}
    <SampleChart />
  </div>
</div>
    </div>
  );
};

export default AnotherHome;

// const thinkingTimeData: ProblemTagTimeData[] = [
//     { tag: 'dp ', timeSpent: 45 },
//     { tag: 'Graph ', timeSpent: 60 },
//     { tag: 'Greedy', timeSpent: 30 },
//     { tag: 'Binary Search', timeSpent: 20 },
//     { tag: 'Greedy', timeSpent: 30 },
//     { tag: 'Greedy', timeSpent: 30 },
//     { tag: 'Greedy', timeSpent: 30 },

//   ];

//   const implementationTimeData: ProblemTagTimeData[] = [
//     { tag: 'Dynamic ', timeSpent: 30 },
//     { tag: 'Graph ', timeSpent: 80 },
//     { tag: 'Greedy', timeSpent: 15 },
//     { tag: 'Binary Search', timeSpent: 10 },
//     { tag: 'Greedy', timeSpent: 30 },
//     { tag: 'Greedy', timeSpent: 30 },
//     { tag: 'Greedy', timeSpent: 30 },
//     { tag: 'Greedy', timeSpent: 30 },
//     { tag: 'Greedy', timeSpent: 30 },
//   ];

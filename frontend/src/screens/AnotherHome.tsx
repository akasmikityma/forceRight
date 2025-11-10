
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { allCards } from "../CardsData"
import DifficultyStats from "@/comps/DifficultyDist"
import MostStruggled from "@/comps/MostStruggled"
import StreakComp from "@/comps/StreakComp"
import { allTracks, authenticated, CombinedTracks, type TrackInterface } from "@/store/atoms"
import { Editor } from "@monaco-editor/react"
import axios from "axios"
import { memo } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { SampleChart } from "../comps/SampleChart"

const Card = memo(({ card, isActive, id }: { card: TrackInterface; isActive: any; id: number }) => {
  const cardRef = useRef(null)
  const nav = useNavigate()

  const trackOnClickHandler = () => {
    nav(`/track/${id}`)
  }

  useEffect(() => {
    if (cardRef.current) {
      // @ts-ignore
      cardRef.current.style.transition = "transform 0.5s ease-in-out, opacity 0.5s ease-in-out, scale 0.5s ease-in-out"
    }
  }, [isActive])

  return (
    <div
      ref={cardRef}
      className={`absolute w-full md:w-2/3 sm:w-full max-w-2xl rounded-2xl shadow-2xl transition-all duration-500 ease-in-out backdrop-blur-lg bg-opacity-70 hover:scale-105 hover:shadow-[0px_0px_30px_rgba(59,130,246,0.6)] hover:translate-y-[-5px] hover:rotate-[1deg] ${
        isActive ? "opacity-100 scale-100" : "opacity-0 scale-90"
      }`}
      style={{
        transform: isActive ? "translateX(0%)" : "translateX(110%)",
        zIndex: isActive ? allCards.length : 0,
        background: "linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(96, 165, 250, 0.05) 100%)",
        border: "2px solid rgba(249, 115, 22, 0.3)",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="border-2 border-orange-400 rounded-2xl p-6 h-[400px] flex flex-col justify-between relative bg-gradient-to-br from-blue-100 to-blue-50 shadow-lg hover:from-blue-200 hover:to-blue-100 transition-all duration-500"
        onClick={trackOnClickHandler}
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-orange-600 drop-shadow-lg tracking-wide">
            🚀 Recently Solved Problems
          </h2>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-blue-800 underline decoration-orange-400 transition-colors duration-300 hover:text-orange-600">
            {card.problemLink}
          </h3>
          <div className="p-3 rounded-lg shadow-md border border-gray-600 overflow-hidden bg-gray-900 transition-all duration-500 hover:shadow-[0px_0px_20px_rgba(249,115,22,0.5)] hover:scale-105">
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
  )
})

const AnotherHome = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)

  const alltheTracks = useRecoilValue(allTracks)
  const [dbtracks, setdbTracks] = useState([])
  const athed = useRecoilValue(authenticated)
  const nav = useNavigate()
  // const [combinedTracks, setCombinedTracks] = useState<TrackInterface[]>([]);
  const [combinedTracks, setCombinedTracks] = useRecoilState(CombinedTracks)

  const backEnd_url = "https://forceright-backend-1.onrender.com"
  // const dev_url = "http://localhost:8080"

  useEffect(() => {
    if (!athed) {
      nav("/")
    }
  }, [athed, nav])
  const getTracksFrom_Db = async () => {
    try {
      const response = await axios.get(`${backEnd_url}/prtracks/mytracks`, { withCredentials: true })
      const tracks_db = response.data.tracks
      setdbTracks(tracks_db)
      console.log("Fetched from DB:", tracks_db)
    } catch (error) {
      console.error("Error fetching tracks from DB:", error)
    }
  }

  useEffect(() => {
    getTracksFrom_Db()
  }, [])

  useEffect(() => {
    console.log(alltheTracks)
  }, [alltheTracks])

  const memoizedCombinedTracks = useMemo(() => {
    const trackMap = new Map()
    ;[...dbtracks, ...alltheTracks].forEach((track) => {
      trackMap.set(track.id, track)
    })
    return Array.from(trackMap.values())
  }, [dbtracks, alltheTracks])

  useEffect(() => {
    setCombinedTracks(memoizedCombinedTracks)
    console.log(`combined Tracks : `, memoizedCombinedTracks)
  }, [memoizedCombinedTracks])

  const goToPreviousCard = useCallback(() => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + combinedTracks.length) % combinedTracks.length)
  }, [combinedTracks])

  const goToNextCard = useCallback(() => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % combinedTracks.length)
  }, [combinedTracks])

  return (
    <div
      className="min-h-screen flex flex-col bg-gray-50 overflow-y-auto"
      style={{
        scrollbarWidth: "none", // For Firefox
        msOverflowStyle: "none", // For Internet Explorer and Edge
      }}
    >
      {/* ... other parts of the component */}

      <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-400 p-4 flex justify-around items-center">
        <DifficultyStats />
        <StreakComp />
        <MostStruggled />
      </div>

      <div
        className="flex-grow h- flex justify-center items-center bg-gradient-to-b from-blue-50 to-blue-100 relative overflow-hidden p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full md:w-11/12 md:h-3/4  max-h-[600px]  h-full flex items-center justify-center">
          {combinedTracks.map((card, index) => (
            <Card key={index} card={card} isActive={index === currentCardIndex} id={card.id} />
          ))}
        </div>
        <button
          onClick={goToPreviousCard}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white rounded-full p-2 transition-colors shadow-lg"
        >
          &lt;
        </button>
        <button
          onClick={goToNextCard}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white rounded-full p-2 transition-colors shadow-lg"
        >
          &gt;
        </button>
      </div>

      {/* ... other parts of the component */}
      <div className="flex h-48 flex-row justify-around p-4 bg-white">
        <div className="h-[200px] w-full md:w-1/2 lg:w-1/3">
          <SampleChart />
        </div>
      </div>
    </div>
  )
}

export default AnotherHome


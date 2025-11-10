
import { useState, useEffect } from "react"
import axios from "axios"
import { useRecoilState } from "recoil"
import { track, allTracks } from "../store/atoms"
import Confuse from "@/comps/Confuse"
import { AiFillDelete } from "react-icons/ai"
import ImplementationEditor from "@/comps/ImplementationEditor"
import { DifficultyStatus, Solstatus, Rating } from "../store/atoms"
import { X } from "lucide-react"
import { ToastContainer, toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const options = [
  "2-sat",
  "binary search",
  "bitmasks",
  "brute force",
  "chinese remainder theorem",
  "combinatorics",
  "constructive algorithms",
  "data structures",
  "dfs and similar",
  "divide and conquer",
  "dp",
  "dsu",
  "expression parsing",
  "fft",
  "flows",
  "games",
  "geometry",
  "graph matchings",
  "graphs",
  "greedy",
  "hashing",
  "implementation",
  "interactive",
  "math",
  "matrices",
  "meet-in-the-middle",
  "number theory",
  "probabilities",
  "schedules",
  "shortest paths",
  "sortings",
  "string suffix structures",
  "strings",
  "ternary search",
  "trees",
  "two pointers",
]

const CreateTrack = () => {
  const [currentTrack, setCurrentTrack] = useRecoilState(track)
  const [allTracksState, setAllTracksState] = useRecoilState(allTracks)
  const [time, setTime] = useState(0)
  const [rating, setRating] = useState(Rating.ONE)
  const [difficulty, setDifficulty] = useState(DifficultyStatus.EASY)
  const generateTrackId = () => (allTracksState.length ? allTracksState[allTracksState.length - 1].id + 1 : 1)
  const nav = useNavigate()

  useEffect(() => {
    setCurrentTrack({
      logic: [],
      implementations: [],
      id: 0,
      logicGap: "",
      implementationGap: "",
      initialThoughts: "",
      problemLink: "",
      solution: "",
      createdAt: "",
      timeTakenMinutes: 0,
      tags: [],
      rating: Rating.ONE,
      status: Solstatus.PENDING,
      difficulty: DifficultyStatus.EASY,
      updatedAt: "",
      userId: 0,
    })
  }, [])

  const addLogicField = () => {
    setCurrentTrack((prev) => ({
      ...prev,
      logic: [...(prev.logic || []), ""],
    }))
  }

  const addInitialThoughts = () => {
    setCurrentTrack((prev) => ({
      ...prev,
      initialThoughts: " ",
    }))
  }

  const addlogicGap = () => {
    setCurrentTrack((prev) => ({
      ...prev,
      logicGap: " ",
    }))
  }

  const addimplementationGap = () => {
    setCurrentTrack((prev) => ({
      ...prev,
      implementationGap: " ",
    }))
  }

  const addsolution = () => {
    setCurrentTrack((prev) => ({
      ...prev,
      solution: " ",
    }))
  }

  const updatePrLink = (value: string) => {
    setCurrentTrack((prev) => ({
      ...prev,
      problemLink: value,
    }))
  }

  const updateInitials = (value: string) => {
    if (!isTyping) setIsTyping(true)
    setCurrentTrack((prev) => ({
      ...prev,
      initialThoughts: value,
    }))
  }

  const updateLogicGap = (value: string) => {
    if (!isTyping) setIsTyping(true)
    setCurrentTrack((prev) => ({
      ...prev,
      logicGap: value,
    }))
  }

  const updateImplegap = (value: string) => {
    if (!isTyping) setIsTyping(true)
    setCurrentTrack((prev) => ({
      ...prev,
      implementationGap: value,
    }))
  }

  const updateSolution = (value: string) => {
    if (!isTyping) setIsTyping(true)
    setCurrentTrack((prev) => ({
      ...prev,
      solution: value,
    }))
  }

  const deleteInitialThoughts = () => {
    setCurrentTrack((prev) => ({
      ...prev,
      initialThoughts: "",
    }))
  }

  const deleteLogicGap = () => {
    setCurrentTrack((prev) => ({
      ...prev,
      logicGap: "",
    }))
  }

  const deleteImpleGap = () => {
    setCurrentTrack((prev) => ({
      ...prev,
      implementationGap: "",
    }))
  }

  const deleteSolution = () => {
    setCurrentTrack((prev) => ({
      ...prev,
      solution: "",
    }))
  }

  const updateLogicField = (index: number, value: string) => {
    setCurrentTrack((prev) => {
      const updatedLogicFields = [...(prev.logic || [])]
      updatedLogicFields[index] = value
      return { ...prev, logic: updatedLogicFields }
    })
  }

  const deleteLogicField = (index: number) => {
    setCurrentTrack((prev) => {
      const updatedLogicFields = [...(prev.logic || [])]
      updatedLogicFields.splice(index, 1)
      return { ...prev, logic: updatedLogicFields }
    })
  }

  const addImplementationField = () => {
    setCurrentTrack((prev) => ({
      ...prev,
      implementations: [...(prev.implementations || []), "// Write your implementation"],
    }))
  }

  const updateImplementationField = (index: number, value: string) => {
    if (!isTyping) setIsTyping(true)
    setCurrentTrack((prev) => {
      const updatedImplementationFields = [...(prev.implementations || [])]
      updatedImplementationFields[index] = value
      return { ...prev, implementations: updatedImplementationFields }
    })
  }

  const deleteImplementationField = (index: number) => {
    setCurrentTrack((prev) => {
      const updatedImplementationFields = [...(prev.implementations || [])]
      updatedImplementationFields.splice(index, 1)
      return { ...prev, implementations: updatedImplementationFields }
    })
  }

  const backEnd_url = "https://forceright-backend-1.onrender.com"
  // const dev_url = "http://localhost:8080"

  const saveTodb = async () => {
    const tracktoGo = {
      ...currentTrack,
      timeTakenMinutes: time,
      rating: rating,
      difficulty: difficulty,
      tags: selectedTags,
      createdAt: Date.now(),
    }
    console.log(`tracktoGO : `, tracktoGo)
    const response = await axios.post(`${backEnd_url}/prtracks/createPr`, tracktoGo, { withCredentials: true })
    toast(response.data.msg)
    console.log(JSON.stringify(response.data))
  }

  const saveTrack = async () => {
    console.log(`time : `, time)
    console.log(`selected tags`, JSON.stringify(selectedTags))

    setAllTracksState((prev) => [
      ...prev,
      {
        ...currentTrack,
        id: generateTrackId(),
        timeTakenMinutes: time,
        rating: rating,
        difficulty: difficulty,
        createdAt: new Date().toISOString(),
      },
    ])

    try {
      await saveTodb()
      setTimeout(() => {
        nav("/home")
      }, 2000)
    } catch (err) {
      console.error("Error updating track:", err)
      toast.error("Error updating track. Please try again.")
    }

    setCurrentTrack({
      logic: [],
      implementations: [],
      id: 0,
      logicGap: "",
      implementationGap: "",
      initialThoughts: "",
      problemLink: "",
      solution: "",
      createdAt: "",
      timeTakenMinutes: 0,
      rating: Rating.THREE,
      status: Solstatus.PENDING,
      difficulty: DifficultyStatus.EASY,
      updatedAt: "",
      userId: 0,
      tags: [],
    })

    setIsTyping(false)
    setTime(0)
    setSelectedTags([])
  }

  const [isTyping, setIsTyping] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const toggleSelection = (item: string) => {
    setSelectedTags((prev) => (prev.includes(item) ? prev.filter((i) => i != item) : [...prev, item]))
  }

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined
    if (isTyping) {
      timer = setInterval(() => {
        setTime((prev) => prev + 1)
      }, 1000)
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [isTyping])

  return (
    <div className="min-h-screen p-10 bg-gray-50">
      <div className="absolute top-4 right-10">
        <ToastContainer />
      </div>
      <div className=" absolute top-16 right-10">
        <Confuse text="click to buttons to add respective field" />
      </div>

      <div className="flex justify-between items-center w-full px-6 bg-white rounded-lg shadow-sm p-4 mb-6">
        {/* Timer Section */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-blue-600">Timer:</span>
            <span className="text-lg font-bold text-blue-700">{time}s</span>
          </div>
          <button
            onClick={() => setIsTyping(!isTyping)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm transition"
          >
            {isTyping ? "Stop" : "Start"}
          </button>
          <button
            onClick={() => {
              setIsTyping(false)
              setTime(0)
            }}
            className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-lg text-sm transition"
          >
            Reset
          </button>
        </div>

        {/* Dropdown Menus & Multi-Select */}
        <div className="flex gap-4 items-center">
          {/* Rate Yourself */}
          <DropdownMenu>
            <DropdownMenuTrigger className="border-2 border-blue-500 text-blue-600 font-semibold p-2 rounded-lg hover:bg-blue-50 transition">
              Rate Yourself
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-[150px]">
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setRating(Rating.ONE)}>⭐</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRating(Rating.TWO)}>⭐⭐</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRating(Rating.THREE)}>⭐⭐⭐</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRating(Rating.FOUR)}>⭐⭐⭐⭐</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRating(Rating.FIVE)}>⭐⭐⭐⭐⭐</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Set Difficulty */}
          <DropdownMenu>
            <DropdownMenuTrigger className="border-2 border-orange-500 text-orange-600 font-semibold p-2 rounded-lg hover:bg-orange-50 transition">
              Set Difficulty
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-[150px]">
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setDifficulty(DifficultyStatus.EASY)}>🟢 EASY</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDifficulty(DifficultyStatus.MEDIUM)}>🟡 MEDIUM</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDifficulty(DifficultyStatus.HARD)}>🔴 HARD</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Multi-Select Dropdown */}
          <div className="w-full max-w-xs">
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedTags.map((item: any) => (
                <div
                  key={item}
                  className="flex items-center bg-blue-100 border border-blue-300 px-2 py-1 rounded-lg text-sm text-blue-700 font-medium"
                >
                  {item}
                  <button className="ml-1 text-blue-500 hover:text-blue-700" onClick={() => toggleSelection(item)}>
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger className="w-full border-2 border-blue-400 text-blue-600 p-2 rounded-lg text-left font-medium hover:bg-blue-50 transition">
                Select Tags
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full max-h-60 overflow-y-auto">
                <DropdownMenuSeparator />
                {options.map((option) => (
                  <DropdownMenuItem key={option} onClick={() => toggleSelection(option)}>
                    {selectedTags.includes(option) ? "✅ " : ""} {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mb-6 mt-8 flex-wrap">
        <button
          onClick={addInitialThoughts}
          className="bg-blue-100 hover:bg-blue-200 border-2 border-blue-400 text-blue-700 font-semibold px-4 py-2 rounded-lg transition"
        >
          Initial Thoughts
        </button>
        <button
          onClick={addLogicField}
          className="bg-blue-100 hover:bg-blue-200 border-2 border-blue-400 text-blue-700 font-semibold px-4 py-2 rounded-lg transition"
        >
          Add Logic Field
        </button>
        <button
          onClick={addImplementationField}
          className="bg-orange-100 hover:bg-orange-200 border-2 border-orange-400 text-orange-700 font-semibold px-4 py-2 rounded-lg transition"
        >
          Add Implementation Field
        </button>
        <button
          onClick={addlogicGap}
          className="bg-blue-100 hover:bg-blue-200 border-2 border-blue-400 text-blue-700 font-semibold px-4 py-2 rounded-lg transition"
        >
          Logic Gap
        </button>
        <button
          onClick={addimplementationGap}
          className="bg-orange-100 hover:bg-orange-200 border-2 border-orange-400 text-orange-700 font-semibold px-4 py-2 rounded-lg transition"
        >
          Implementation Gap
        </button>
        <button
          onClick={addsolution}
          className="bg-green-100 hover:bg-green-200 border-2 border-green-400 text-green-700 font-semibold px-4 py-2 rounded-lg transition"
        >
          Solution
        </button>
      </div>

      <div className="space-y-4">
        <div className="bg-white border-2 border-blue-200 p-4 rounded-lg shadow-sm">
          <label className="block mb-2 text-sm font-semibold text-blue-700">Problem Link</label>
          <textarea
            className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={currentTrack.problemLink}
            onChange={(e) => updatePrLink(e.target.value)}
            placeholder="Paste your problem link here"
          />
        </div>

        {currentTrack.initialThoughts && (
          <div className="bg-white border-2 border-blue-200 p-4 rounded-lg shadow-sm relative">
            <button
              className="absolute top-3 right-3 text-red-500 hover:text-red-700"
              onClick={() => deleteInitialThoughts()}
            >
              <AiFillDelete size={20} />
            </button>
            <label className="block mb-2 text-sm font-semibold text-blue-700">Initial Thoughts</label>
            <textarea
              value={currentTrack.initialThoughts}
              onChange={(e) => updateInitials(e.target.value)}
              className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your initial thoughts..."
              rows={4}
            />
          </div>
        )}

        {currentTrack.logic.map((logic, index) => (
          <div key={index} className="bg-white border-2 border-blue-200 p-4 rounded-lg shadow-sm relative">
            <button
              className="absolute top-3 right-3 text-red-500 hover:text-red-700"
              onClick={() => deleteLogicField(index)}
            >
              <AiFillDelete size={20} />
            </button>
            <label className="block mb-2 text-sm font-semibold text-blue-700">Logic {index + 1}</label>
            <textarea
              placeholder={`Enter logic ${index + 1}`}
              className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={logic}
              onChange={(e) => updateLogicField(index, e.target.value)}
              rows={4}
            />
          </div>
        ))}

        {currentTrack.implementations.map((impl, index) => (
          <div key={index} className="bg-white border-2 border-orange-200 p-4 rounded-lg shadow-sm relative">
            <button
              className="absolute top-3 right-3 text-red-500 hover:text-red-700 z-10"
              onClick={() => deleteImplementationField(index)}
            >
              <AiFillDelete size={20} />
            </button>
            <label className="block mb-2 text-sm font-semibold text-orange-700">Implementation {index + 1}</label>
            <ImplementationEditor data={impl} onCodeChange={(value) => updateImplementationField(index, value)} />
          </div>
        ))}

        {currentTrack.logicGap && (
          <div className="bg-white border-2 border-blue-200 p-4 rounded-lg shadow-sm relative">
            <button className="absolute top-3 right-3 text-red-500 hover:text-red-700" onClick={() => deleteLogicGap()}>
              <AiFillDelete size={20} />
            </button>
            <label className="block mb-2 text-sm font-semibold text-blue-700">Logic Gap</label>
            <textarea
              value={currentTrack.logicGap}
              onChange={(e) => updateLogicGap(e.target.value)}
              className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="What was the logic gap?"
              rows={4}
            />
          </div>
        )}

        {currentTrack.implementationGap && (
          <div className="bg-white border-2 border-orange-200 p-4 rounded-lg shadow-sm relative">
            <button className="absolute top-3 right-3 text-red-500 hover:text-red-700" onClick={() => deleteImpleGap()}>
              <AiFillDelete size={20} />
            </button>
            <label className="block mb-2 text-sm font-semibold text-orange-700">Implementation Gap</label>
            <textarea
              value={currentTrack.implementationGap}
              onChange={(e) => updateImplegap(e.target.value)}
              className="w-full p-3 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="What was the implementation gap?"
              rows={4}
            />
          </div>
        )}

        {currentTrack.solution && (
          <div className="bg-white border-2 border-green-200 p-4 rounded-lg shadow-sm relative">
            <button
              className="absolute top-3 right-3 text-red-500 hover:text-red-700 z-10"
              onClick={() => deleteSolution()}
            >
              <AiFillDelete size={20} />
            </button>
            <label className="block mb-2 text-sm font-semibold text-green-700">Solution</label>
            <ImplementationEditor data={currentTrack.solution} onCodeChange={(value) => updateSolution(value)} />
          </div>
        )}
      </div>

      <button
        onClick={saveTrack}
        className="mt-8 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-lg transition shadow-md"
      >
        Save Track
      </button>
    </div>
  )
}

export default CreateTrack


/*
id:number,
  logic: string[]; // Array for multiple logic fields
  implementations: string[]; // Array for multiple implementation fields
  problemLink : string;
  initialThoughts : string,
  logicGap ?: string;
  implementationGap ? :string
  solution :string;
  status :string
  rating : string
  userId : number
  createdAt : string
  updatedAt : string
*/
// lets say problem statement/Link field would be there before hand >> 

import  { useState,useEffect } from 'react';
import axios from "axios";
import { useRecoilState } from 'recoil';
import { track, allTracks } from '../store/atoms'; // Update path as needed
import Confuse from '@/comps/Confuse';
import { AiFillDelete } from 'react-icons/ai';
import ImplementationEditor from '@/comps/ImplementationEditor';
import { DifficultyStatus,Solstatus,Rating } from '../store/atoms';
// import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import {  X } from "lucide-react";
import {ToastContainer, toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
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
  "two pointers"
]


// import { TrackInterface } from '../store/atoms';

const CreateTrack = () => {
  const [currentTrack, setCurrentTrack] = useRecoilState(track);
  const [allTracksState, setAllTracksState] = useRecoilState(allTracks);
  const [time,setTime] = useState(0);
  const [rating,setRating] = useState(Rating.ONE);
  const [difficulty,setDifficulty] = useState(DifficultyStatus.EASY);
  const generateTrackId = () => (allTracksState.length ? allTracksState[allTracksState.length - 1].id + 1 : 1);
  const nav = useNavigate();
  useEffect(() => {
    // Reset track when component mounts
    setCurrentTrack({ logic: [], implementations: [],id:0, logicGap:"",implementationGap:"",
      initialThoughts:"",problemLink:"",solution:"",createdAt:"",timeTakenMinutes:0,tags:[],rating:Rating.ONE,status:Solstatus.PENDING,difficulty:DifficultyStatus.EASY,updatedAt:"",userId:0
     });
  }, []);

  // const addtotheDatabase= async()=>{  
  //    const req = await axios.post("/")
  // }

const addLogicField = () => {
    setCurrentTrack((prev) => ({
      ...prev,
      logic: [...(prev.logic || []), ''], // Corrected: Update `logic`
    }));
  };
  
  const addInitialThoughts = ()=>{
    // alert("button clicked")
    setCurrentTrack((prev)=>({
      ...prev,
      initialThoughts : " "
    }))
  }
  const addlogicGap = ()=>{
    // alert("button clicked")
    setCurrentTrack((prev)=>({
      ...prev,
      logicGap : " "
    }))
  }
  
  const addimplementationGap = ()=>{
    // alert("button clicked")
    setCurrentTrack((prev)=>({
      ...prev,
      implementationGap : " "
    }))
  }
  
  const addsolution = () =>{
    // alert("delete clicked");
    setCurrentTrack((prev)=>({
      ...prev,
      solution:" "
    }))
  }

  const updatePrLink =(value:string)=>{
    setCurrentTrack((prev)=>({
      ...prev,
      problemLink:value
    }))
  }

  const updateInitials= (value:string)=>{
    if (!isTyping) setIsTyping(true);
    setCurrentTrack((prev)=> ({
      ...prev,
      initialThoughts:value
    }))
  }
  
  const updateLogicGap = (value:string)=>{
    if (!isTyping) setIsTyping(true);  
    setCurrentTrack((prev)=>({
        ...prev,
        logicGap:value
      }))
  }

  
  const updateImplegap = (value:string)=>{
    if (!isTyping) setIsTyping(true);
    setCurrentTrack((prev)=>({
      ...prev,
      implementationGap:value
    }))
  }
  
  
  const updateSolution = (value:string)=>{
    if (!isTyping) setIsTyping(true);
    setCurrentTrack((prev)=>({
      ...prev,
      solution:value
    }))
  }

  const deleteInitialThoughts = () =>{
    // alert("delete clicked");
    setCurrentTrack((prev)=>({
      ...prev,
      initialThoughts:""
    }))
  }
  
  const deleteLogicGap =()=>{
      setCurrentTrack((prev)=>({
        ...prev,
        logicGap:""
      }))
  }

  const deleteImpleGap =()=>{
    setCurrentTrack((prev)=>({
      ...prev,
      implementationGap:""
    }))
  }
  const deleteSolution =()=>{
    setCurrentTrack((prev)=>({
      ...prev,
      solution:""
    }))
  }

  const updateLogicField = (index: number, value: string) => {
    setCurrentTrack((prev) => {
      const updatedLogicFields = [...(prev.logic || [])];
      updatedLogicFields[index] = value;
      return { ...prev, logic: updatedLogicFields }; // Corrected: Update `logic`
    });
  };

  const deleteLogicField = (index: number) => {
    setCurrentTrack((prev) => {
      const updatedLogicFields = [...(prev.logic || [])];
      updatedLogicFields.splice(index, 1);
      return { ...prev, logic: updatedLogicFields }; // Corrected: Update `logic`
    });
  };

  const addImplementationField = () => {
    setCurrentTrack((prev) => ({
      ...prev,
      implementations: [
        ...(prev.implementations || []),
        '// Write your implementation',
      ], // Corrected: Update `implementations`
    }));
  };

  const updateImplementationField = (index: number, value: string) => {
    if (!isTyping) setIsTyping(true);
    setCurrentTrack((prev) => {
      const updatedImplementationFields = [...(prev.implementations || [])];
      updatedImplementationFields[index] = value;
      return { ...prev, implementations: updatedImplementationFields }; // Corrected: Update `implementations`
    });
  };

  const deleteImplementationField = (index: number) => {
    setCurrentTrack((prev) => {
      const updatedImplementationFields = [...(prev.implementations || [])];
      updatedImplementationFields.splice(index, 1);
      return { ...prev, implementations: updatedImplementationFields }; // Corrected: Update `implementations`
    });
  };
  // const notify=(data:string)=>{
  //   toast(data);
  // }
  const saveTodb=async()=>{
    const tracktoGo = {...currentTrack,timeTakenMinutes:time,rating:rating,difficulty:difficulty,tags:selectedTags,createdAt:Date.now()};
    console.log(`tracktoGO : `,tracktoGo)
    const response = await axios.post("http://localhost:3000/prtracks/createPr",tracktoGo,{withCredentials:true});
    toast(response.data.msg);
    // alert(response.data.msg);
    console.log(JSON.stringify(response.data));
  }

  // const saveTrack = () => {
  //   console.log(`time : `,time);
  //   setAllTracksState((prev) => [...prev, {...currentTrack,id:generateTrackId(),timeTakenMinutes:time}]);
  //   saveTodb();
  //   setCurrentTrack({ logic: [], implementations: [],id:0, logicGap:"",implementationGap:"",
  //     initialThoughts:"",problemLink:"",solution:"",createdAt:"",timeTakenMinutes:0,tag:"",rating:Rating.THREE,status:Solstatus.PENDING,difficulty:DifficultyStatus.EASY,updatedAt:"",userId:0
  //    }); // Reset the current track
  //    setIsTyping(false);
  //    setTime(0);
  // };
  
  const saveTrack = async() => {
    console.log(`time : `, time);
    console.log(`selected tags`,JSON.stringify(selectedTags))

    // Ensure latest `time` is used
    setAllTracksState((prev) => [
      ...prev,
      { ...currentTrack, id: generateTrackId(), timeTakenMinutes: time,rating:rating ,difficulty:difficulty,createdAt:new Date().toISOString()}
    ]);

    // Wait for state update before saving to DB
    try{
      await saveTodb();
      setTimeout(() =>{
        nav("/");
      }, 2000); // Allow React to process state update first
    }catch(err){
      console.error("Error updating track:", err);
      toast.error("Error updating track. Please try again.");
    }

    // Reset current track
    setCurrentTrack({
      logic: [], implementations: [], id: 0, logicGap: "", implementationGap: "",
      initialThoughts: "", problemLink: "", solution: "", createdAt: "",
      timeTakenMinutes: 0, rating: Rating.THREE, status: Solstatus.PENDING,
      difficulty: DifficultyStatus.EASY, updatedAt: "", userId: 0,tags:[]
    });

    setIsTyping(false);
    setTime(0);
    setSelectedTags([]);
};

  const [isTyping,setIsTyping] = useState(false);
  const [selectedTags,setSelectedTags] = useState<String[]>([])

  const toggleSelection =(item:string)=>{
      setSelectedTags((prev)=>
        prev.includes(item)?prev.filter((i)=>i !=item) : [...prev,item]
      );
  }
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined; // Allow undefined
    if (isTyping) {
      timer = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer); // Ensure timer is defined before clearing
    };
  }, [isTyping]);

  return (
    <div className="min-h-screen p-10">
      <div className='absolute top-4 right-10'>
      <ToastContainer />
      </div>
      <div className=' absolute top-16 right-10'>
        <Confuse text='click to buttons to add respective field'/>
      </div>
      <div className="flex justify-between items-center w-full px-6">
  {/* Timer Section */}
  <div className="flex items-center gap-3">
    <h2>timer {time}</h2>
    <button onClick={() => setIsTyping(!isTyping)}>{isTyping ? "stop" : "start"}</button>
    <button
      onClick={() => {
        setIsTyping(false);
        setTime(0);
      }}
    >
      restart
    </button>
  </div>

  {/* Dropdown Menus & Multi-Select */}
  <div className="flex gap-6 items-center">
    {/* Rate Yourself */}
    <DropdownMenu>
      <DropdownMenuTrigger className="border p-2 rounded-lg">Rate Yourself</DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[150px]">
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setRating(Rating.ONE)}>*</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setRating(Rating.TWO)}>**</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setRating(Rating.THREE)}>***</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setRating(Rating.FOUR)}>****</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setRating(Rating.FIVE)}>*****</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    {/* Set Difficulty */}
    <DropdownMenu>
      <DropdownMenuTrigger className="border p-2 rounded-lg">Set Difficulty</DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-[150px]">
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setDifficulty(DifficultyStatus.EASY)}>EASY</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setDifficulty(DifficultyStatus.MEDIUM)}>MEDIUM</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setDifficulty(DifficultyStatus.HARD)}>HARD</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    {/* Multi-Select Dropdown */}
    <div className="w-full max-w-xs">
      {/* Display Selected Items */}
      <div className="flex flex-wrap gap-2">
        {selectedTags.map((item: any) => (
          <div key={item} className="flex items-center bg-gray-200 px-2 py-1 rounded-lg text-sm">
            {item}
            <button className="ml-1 text-gray-500 hover:text-red-500" onClick={() => toggleSelection(item)}>
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Dropdown Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full border p-2 rounded-lg text-left">Select Items</DropdownMenuTrigger>
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

      <div className="flex gap-4 mb-4 mt-8 relative">
        <button
          onClick={addInitialThoughts}
          className="hover:bg-700 bg-cyan-200 border-orange-500 border-2 px-4 py-2 rounded"
        >
          Initial Thoughts
        </button>
        <button
          onClick={addLogicField}
          className="hover:bg-700 bg-cyan-200 border-orange-500 border-2 px-4 py-2 rounded"
        >
          Add Logic Field
        </button>
        <button
          onClick={addImplementationField}
          className="hover:bg-700 bg-cyan-200 border-orange-500 border-2 px-4 py-2 rounded"
        >
          Add Implementation Field
        </button>
        <button
          onClick={addlogicGap}
          className="hover:bg-700 bg-cyan-200 border-orange-500 border-2 px-4 py-2 rounded"
        >
          Logic gap
        </button>
        <button
          onClick={addimplementationGap}
          className="hover:bg-700 bg-cyan-200 border-orange-500 border-2 px-4 py-2 rounded"
        >
          Implementation gap 
        </button>
        <button
          onClick={addsolution}
          className="hover:bg-700 bg-cyan-200 border-orange-500 border-2 px-4 py-2 rounded"
        >
          Solution 
        </button>
      </div>

      <div>
        <div className="mb-4 border p-4 relative">
        <label className="block mb-2 text-sm font-medium text-gray-700">
                Problem Link
            </label>
          <textarea name="" id="" 
           className="w-full p-2 border border-gray-300 rounded"
          value={currentTrack.problemLink} onChange={(e)=>updatePrLink(e.target.value)}></textarea>
        </div>
        {/* {Initial Thoughts} */}
        {currentTrack.initialThoughts && (<div className="mb-4 border p-4 relative">
          <button
              className="absolute top-2 right-2"
              onClick={() => deleteInitialThoughts()}
            >
              <AiFillDelete color="red" />
            </button>
            <label className="block mb-2 text-sm font-medium text-gray-700">
                Intuition
            </label>
          <textarea name="" id="" value={currentTrack.initialThoughts} onChange={(e)=>updateInitials(e.target.value)} 
           className="w-full p-2 border border-gray-300 rounded"
          placeholder='Write Initial Thoughts'>
           
          </textarea>
        </div>)}
        {/* Render Logic Fields */}
        {currentTrack.logic.map((logic, index) => (
          <div key={index} className="mb-4 border p-4 relative">
            <button
              className="absolute top-2 right-2"
              onClick={() => deleteLogicField(index)}
            >
              <AiFillDelete color="red" />
            </button>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Logic {index + 1}
            </label>
            <textarea
              placeholder={`Enter logic ${index + 1}`}
              className="w-full p-2 border border-gray-300 rounded"
              value={logic}
              onChange={(e) => updateLogicField(index, e.target.value)}
            />
          </div>
        ))}
        {/* Render Implementation Fields */}
        {currentTrack.implementations.map((impl, index) => (
          <div key={index} className="mb-4 border p-4 relative">
            <button
              className="absolute top-2 right-2"
              onClick={() => deleteImplementationField(index)}
            >
              <AiFillDelete color="red" />
            </button>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Implementation {index + 1}
            </label>
            <ImplementationEditor
              data={impl}
              onCodeChange={(value) => updateImplementationField(index, value)}
            />
          </div>
        ))}
        
        {/* {logic Gap} */}
        {currentTrack.logicGap && (<div className="mb-4 border p-4 relative">
          <button
              className="absolute top-2 right-2"
              onClick={() => deleteLogicGap()}
            >
              <AiFillDelete color="red" />
            </button>
            <label className="block mb-2 text-sm font-medium text-gray-700">
                Logic Gap
            </label>
          <textarea name="" id="" value={currentTrack.logicGap} onChange={(e)=>updateLogicGap(e.target.value)} 
           className="w-full p-2 border border-gray-300 rounded"
          placeholder='Write Initial Thoughts'>
           
          </textarea>
        </div>)}

          {/* {Implementation Gap} */}
        {currentTrack.implementationGap && (<div className="mb-4 border p-4 relative">
          <button
              className="absolute top-2 right-2"
              onClick={() => deleteImpleGap()}
            >
              <AiFillDelete color="red" />
            </button>
            <label className="block mb-2 text-sm font-medium text-gray-700">
                Implementation Gap
            </label>
          <textarea name="" id="" value={currentTrack.implementationGap} onChange={(e)=>updateImplegap(e.target.value)} 
           className="w-full p-2 border border-gray-300 rounded"
          placeholder='Write Initial Thoughts'>
           
          </textarea>
        </div>)}

          {/* {Solution} */}
        {
          currentTrack.solution && (
            <div className="mb-4 border p-4 relative">
              <button
                className="absolute top-2 right-2"
                onClick={() => deleteSolution()}
              >
                <AiFillDelete color="red" />
              </button>
              <label className="block mb-2 text-sm font-medium text-gray-700">
              Solution
            </label>
            <ImplementationEditor data={currentTrack.solution} onCodeChange={(value)=>updateSolution(value)}/>
            </div>
          )
        }
      </div>

      <button
        onClick={saveTrack}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Save Track
      </button>
    </div>
  );
};

export default CreateTrack;

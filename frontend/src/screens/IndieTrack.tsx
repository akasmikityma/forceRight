// almost the same createTrack file would be there >>>> 

/*
there would also be a button [update]
all the buttons at the top would also be there in case the user wants to add some more things on top of what there is already there >>> 

but the issue is there should already as many fields present as there are in the track data >>> 

the current text that the track has must be there in their respective fields >> 
every field must be editable >> 

*/
// import React, { useEffect ,useState} from 'react'
// import { useParams } from 'react-router-dom';
// import { useRecoilValue,useSetRecoilState } from 'recoil';
// import { track,allTracks, TrackInterface } from '@/store/atoms';
// import { AiFillDelete } from 'react-icons/ai';
// import ImplementationEditor from '@/comps/ImplementationEditor';
// const IndieTrack = () => {
//   const {id} = useParams<{id:string}>()  
  
//   const allTracksState = useRecoilValue(allTracks);
//   const  setCurrentTrack = useSetRecoilState(track); // the whole track is supposed to come from the home and then 
//                                                                     // have this state >> 
//   const [currentTrack,setTrackState] = useState<TrackInterface>(()=>({
//     id:0,
//     logic:[],
//     implementations:[]
//   }))
  
//   useEffect(()=>{
//         if(id){
//             const foundTrack = allTracksState.find((track)=>track.id==Number(id));
//             if(foundTrack){
//               // set the track to the current track>> 
//               setCurrentTrack(foundTrack);
//               setTrackState(foundTrack);
//             }
//         }
//       },[id,allTracksState,setCurrentTrack])
      
//       const addLogicField = () => {
//         setCurrentTrack((prev) => ({
//           ...prev,
//           logic: [...(prev.logic || []), ''], // Corrected: Update `logic`
//         }));
//       };
    
//       const updateLogicField = (index: number, value: string) => {
//         setCurrentTrack((prev) => {
//           const updatedLogicFields = [...(prev.logic || [])];
//           updatedLogicFields[index] = value;
//           return { ...prev, logic: updatedLogicFields }; // Corrected: Update `logic`
//         });
//       };
    
//       const deleteLogicField = (index: number) => {
//         setCurrentTrack((prev) => {
//           const updatedLogicFields = [...(prev.logic || [])];
//           updatedLogicFields.splice(index, 1);
//           return { ...prev, logic: updatedLogicFields }; // Corrected: Update `logic`
//         });
//       };
    
//       const addImplementationField = () => {
//         setCurrentTrack((prev) => ({
//           ...prev,
//           implementations: [
//             ...(prev.implementations || []),
//             '// Write your implementation',
//           ], // Corrected: Update `implementations`
//         }));
//       };
//       const updateImplementationField = (index: number, value: string) => {
//         setCurrentTrack((prev) => {
//           const updatedImplementationFields = [...(prev.implementations || [])];
//           updatedImplementationFields[index] = value;
//           return { ...prev, implementations: updatedImplementationFields }; // Corrected: Update `implementations`
//         });
//       };
    
//       const deleteImplementationField = (index: number) => {
//         setCurrentTrack((prev) => {
//           const updatedImplementationFields = [...(prev.implementations || [])];
//           updatedImplementationFields.splice(index, 1);
//           return { ...prev, implementations: updatedImplementationFields }; // Corrected: Update `implementations`
//         });
//       };
    
//       const saveTrack = () => {
//         setAllTracksState((prev) => [...prev, currentTrack]);
//         // setCurrentTrack({ logic: [], implementations: [] }); // Reset the current track
//       };
//   return (
//     <div className="min-h-screen p-10">
//       <div className="flex gap-4 mb-4 mt-8 relative">
//         <button
//           onClick={addLogicField}
//           className="hover:bg-700 bg-cyan-200 border-orange-500 border-2 px-4 py-2 rounded"
//         >
//           Add Logic Field
//         </button>
//         <button
//           onClick={addImplementationField}
//           className="hover:bg-700 bg-cyan-200 border-orange-500 border-2 px-4 py-2 rounded"
//         >
//           Add Implementation Field
//         </button>
//       </div>

//       <div>
//         {/* Render Logic Fields */}
//         {currentTrack.logic.map((logic, index) => (
//           <div key={index} className="mb-4 border p-4 relative">
//             <button
//               className="absolute top-2 right-2"
//               onClick={() => deleteLogicField(index)}
//             >
//               <AiFillDelete color="red" />
//             </button>
//             <label className="block mb-2 text-sm font-medium text-gray-700">
//               Logic {index + 1}
//             </label>
//             <textarea
//               placeholder={`Enter logic ${index + 1}`}
//               className="w-full p-2 border border-gray-300 rounded"
//               value={logic}
//               onChange={(e) => updateLogicField(index, e.target.value)}
//             />
//           </div>
//         ))}

//         {/* Render Implementation Fields */}
//         {currentTrack.implementations.map((impl, index) => (
//           <div key={index} className="mb-4 border p-4 relative">
//             <button
//               className="absolute top-2 right-2"
//               onClick={() => deleteImplementationField(index)}
//             >
//               <AiFillDelete color="red" />
//             </button>
//             <label className="block mb-2 text-sm font-medium text-gray-700">
//               Implementation {index + 1}
//             </label>
//             <ImplementationEditor
//               data={impl}
//               onCodeChange={(value) => updateImplementationField(index, value)}
//             />
//           </div>
//         ))}
//       </div>

//       <button
//         onClick={saveTrack}
//         className="bg-green-500 text-white px-4 py-2 rounded"
//       >
//         Save Track
//       </button>
//     </div>
//   )
// }

// export default IndieTrack
import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { track,  TrackInterface, dbTracksState } from "@/store/atoms";
import { AiFillDelete } from "react-icons/ai";
import ImplementationEditor from "@/comps/ImplementationEditor";
import axios from "axios";
import { CombinedTracks } from "@/store/atoms";
import {toast, ToastContainer} from 'react-toastify';
import { useNavigate } from "react-router-dom";

const IndieTrack = () => {
  const { id } = useParams<{ id: string }>();
  const nav = useNavigate();
  const allTracksState = useRecoilValue(CombinedTracks); // Get all tracks from Recoil
  const setAllTracksState = useSetRecoilState(CombinedTracks);
  const setTrackInRecoil = useSetRecoilState(track); // Update current track in Recoil
  const [currentTrack, setCurrentTrack] = useState<TrackInterface | null>(null); // Local state for the current track
  const [loading, setLoading] = useState(true); // Track loading state
  const dbtracks = useRecoilValue(dbTracksState);
  
  // Fetch the track by ID and set it in state
  useEffect(() => {
    if (id) {
      console.log(allTracksState," and the id in the params is ",id);
      let foundTrack = null;
      foundTrack = allTracksState.find((track) => track.id === Number(id));
      if(foundTrack===null || foundTrack === undefined){
        foundTrack = dbtracks.find((track)=>track.id===Number(id));
      }
      console.log("the found track ",foundTrack)
      if (foundTrack) {
        setCurrentTrack(foundTrack); // Set local state
        setTrackInRecoil(foundTrack); // Update Recoil state
      }
      setLoading(false); // Stop loading
    }
  }, [id, allTracksState, setTrackInRecoil]);

  // Add a new logic field
  const addLogicField = () => {
    if (currentTrack) {
      const updatedTrack = { ...currentTrack, logic: [...currentTrack.logic, ""] };
      setCurrentTrack(updatedTrack);
      setTrackInRecoil(updatedTrack);
    }
  };

  // Update a specific logic field
  const updateLogicField = (index: number, value: string) => {
    if (currentTrack) {
      const updatedLogic = [...currentTrack.logic];
      updatedLogic[index] = value;
      const updatedTrack = { ...currentTrack, logic: updatedLogic };
      setCurrentTrack(updatedTrack);
      setTrackInRecoil(updatedTrack);
    }
  };

  // update Initial Thoughts >> 
  const updateInitials = (value :string)=>{
      if(currentTrack){
        const updatedTrack = {...currentTrack , initialThoughts : value};
        setCurrentTrack(updatedTrack);
        setTrackInRecoil(updatedTrack);
      }
  }

  // delete Initial thoughts >> 
  const deleteInitialThoughts =()=>{
      if(currentTrack){
        const updatedTrack = {...currentTrack , initialThoughts:""};
        setCurrentTrack(updatedTrack);
        setTrackInRecoil(updatedTrack);
      }
  }

  // update logic gap >>
    const updateLogicgap = (value :string)=>{
      if(currentTrack){
        const updatedTrack = {...currentTrack , logicGap : value};
        setCurrentTrack(updatedTrack);
        setTrackInRecoil(updatedTrack);
      }
    }

// delete logic gap >> 
    const deleteLogicGap =()=>{
        if(currentTrack){
          const updatedTrack = {...currentTrack , logicGap:""};
          setCurrentTrack(updatedTrack);
          setTrackInRecoil(updatedTrack);
        }
    }

    // update logic gap >>
    const updateImplegap = (value :string)=>{
      if(currentTrack){
        const updatedTrack = {...currentTrack , implementationGap : value};
        setCurrentTrack(updatedTrack);
        setTrackInRecoil(updatedTrack);
      }
    }

    // delete logic gap >> 
    const deleteImpleGap =()=>{
        if(currentTrack){
          const updatedTrack = {...currentTrack , implementationGap:""};
          setCurrentTrack(updatedTrack);
          setTrackInRecoil(updatedTrack);
        }
    }

      // update solution >>
      const updateSolution = (value :string)=>{
        if(currentTrack){
          const updatedTrack = {...currentTrack , solution : value};
          setCurrentTrack(updatedTrack);
          setTrackInRecoil(updatedTrack);
        }
      }
  
      // delete solution  >> 
      const deleteSolution =()=>{
          if(currentTrack){
            const updatedTrack = {...currentTrack , solution:""};
            setCurrentTrack(updatedTrack);
            setTrackInRecoil(updatedTrack);
          }
      }

  // Delete a specific logic field
  const deleteLogicField = (index: number) => {
    if (currentTrack) {
      const updatedLogic = [...currentTrack.logic];
      updatedLogic.splice(index, 1);
      const updatedTrack = { ...currentTrack, logic: updatedLogic };
      setCurrentTrack(updatedTrack);
      setTrackInRecoil(updatedTrack);
    }
  };

  // Add a new implementation field
  const addImplementationField = () => {
    if (currentTrack) {
      const updatedTrack = {
        ...currentTrack,
        implementations: [...currentTrack.implementations, "// Write your implementation"],
      };
      setCurrentTrack(updatedTrack);
      setTrackInRecoil(updatedTrack);
    }
  };

  // Update a specific implementation field
  const updateImplementationField = (index: number, value: string) => {
    if (currentTrack) {
      const updatedImplementations = [...currentTrack.implementations];
      updatedImplementations[index] = value;
      const updatedTrack = { ...currentTrack, implementations: updatedImplementations };
      setCurrentTrack(updatedTrack);
      setTrackInRecoil(updatedTrack);
    }
  };

  // Delete a specific implementation field
  const deleteImplementationField = (index: number) => {
    if (currentTrack) {
      const updatedImplementations = [...currentTrack.implementations];
      updatedImplementations.splice(index, 1);
      const updatedTrack = { ...currentTrack, implementations: updatedImplementations };
      setCurrentTrack(updatedTrack);
      setTrackInRecoil(updatedTrack);
    }
  };

  const updateToDb = async()=>{
    const response = await axios.patch(`http://localhost:3000/prtracks/mytracks/edit/${Number(id)}`,currentTrack,{withCredentials:true});
    console.log(JSON.stringify(response.data));
    toast(response.data.msg);
  }

  const updateTrack = async() => {
    if (currentTrack) {
        console.log(`currentTrack in Update : `, currentTrack);
        setAllTracksState((prevTracks) =>
            prevTracks.map((track) =>
                track.id === currentTrack.id ? currentTrack : track
            )
        );
        try {
          await updateToDb(); // Await the database update
          setTimeout(()=>{
            nav("/");
          },2000)
      } catch (error) {
          console.error("Error updating track:", error);
          toast.error("Error updating track. Please try again."); // Error toast
      }
    }
};

  if (loading) {
    return <div>Loading...</div>; // Show loading until track is fetched
  }

  if (!currentTrack) {
    return <div>No track found!</div>; // Handle the case when no track is found
  }

  return (
    <div className="min-h-screen p-10">
      <div className='absolute top-4 right-10'>
        <ToastContainer />
        </div>
        
        {/* buttons at the top */}
      <div className="flex gap-4 mb-4 mt-8 relative">
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
      </div>

      <div>
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
          <textarea name="" id="" value={currentTrack.logicGap} onChange={(e)=>updateLogicgap(e.target.value)} 
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
        onClick={updateTrack}
        className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Update Track
      </button>
    </div>
  );
};

export default IndieTrack;

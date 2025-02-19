
// import React, { useState } from "react";
// import LIbraryComp from "@/comps/LIbraryComp";
// import SlickTracks from "@/comps/SlickTracks";

// const Library = () => {
//   const [selectedLibrary, setSelectedLibrary] = useState<string | null>(null);

//   const handleLibraryClick = (name: string) => {
//     setSelectedLibrary(name);
//   };

//   return (
//     <div className="min-h-screen p-8 flex flex-col gap-10">
//       {/* Library List */}
//       <div>
//         <div className="grid grid-cols-6 gap-6">
//           {["cfContest 103", "neetCode 150", "CSES 150"].map((name) => (
//             <LIbraryComp key={name} name={name} onClick={() => handleLibraryClick(name)} />
//           ))}
//         </div>
//       </div>

//       {/* Dynamic Section */}
//       <div>
//         <div className="flex flex-col gap-4">
//           {selectedLibrary ? (
//             <LibraryDetails name={selectedLibrary} onBack={() => setSelectedLibrary(null)} />
//           ) : (
//             <>
//               <div className="flex flex-col gap-4">
//                 <h1 className="text-3xl mb-6"> 🚀 last completed tracks -</h1>
//               <SlickTracks />
//               <SlickTracks />
//               <SlickTracks />
//               <SlickTracks />
//               <SlickTracks />
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// // ✅ Add LibraryDetails inside the same file
// const LibraryDetails = ({ name, onBack }: { name: string; onBack: () => void }) => {
//   return (
//     <div className="p-6 gray-100 rounded-lg">
//       <button onClick={onBack} className="mb-4 text-blue-500 underline">
//         Back
//       </button>
//       <h2 className="text-xl font-bold">{name} Content</h2>
//       <div className="flex flex-col gap-3 mt-4">
//         <SlickTracks />
//         <SlickTracks />
//         <SlickTracks />
//         <SlickTracks />
//       </div>
//     </div>
//   );
// };

// export default Library;

// ---------------------------------- with buttons 

import  { useEffect, useState } from "react";
import LIbraryComp from "@/comps/LIbraryComp";
// import SlickTracks from "@/comps/SlickTracks";
import axios from "axios";
// import { v4 as uuidv4 } from 'uuid';
import Modal from 'react-modal';
import { TrackInterface } from "@/store/atoms";
import { useRecoilValue} from "recoil";
import { useNavigate } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";
import {toast, ToastContainer} from "react-toastify"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// interface Track {
//   id: string;
//   content: string;
// }

// import React, { useState, useEffect } from "react";
// import LIbraryComp from "@/comps/LIbraryComp";
// import axios from "axios";
// import Modal from 'react-modal';

// interface TrackInterface {
//   id: string;
//   content: string;
//   problemLink: string;
// }

interface Library {
  id: number;
  name: string;
  problems: TrackInterface[];
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    border: 'none',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};

Modal.setAppElement('#root');
// import { useSetRecoilState } from "recoil";
import { lastFiveCompleted } from "@/store/atoms";
const Library = () => {
  const [libraries, setLibraries] = useState<Library[]>([]);
  const tracks  = useRecoilValue(lastFiveCompleted);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLibModalOpen ,setIsLibModalOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<TrackInterface | null>(null);
  const [selectedLibrary, setSelectedLibrary] = useState<number | null>(null);
  const [lib_name, setLib_name] = useState("");
  const nav = useNavigate();

  const fetchLibraries = async () => {
    try {
      const response = await axios.get("https://forceright-bnd.onrender.com/prtracks/getLibs", { withCredentials: true });
      const libs = response.data.libraries;
      console.log('libs',libs)
      setLibraries(libs);
    } catch (err) {
      toast("Couldn't fetch libraries");
    }
  };

  useEffect(() => {
    fetchLibraries();
  }, []);

  const openModal = (track: TrackInterface) => {
    setSelectedTrack(track);
    setIsModalOpen(true);
  };

  const openModalOflib =()=>{
    setIsLibModalOpen(true);
  }

  const closeModalOflib =()=>{
    setIsLibModalOpen(false);
  }

  const closeModal = () => {
    setSelectedTrack(null);
    setIsModalOpen(false);
  };

  // const createLib_inDB = async()=>{
  //   try{
  //     const response = await axios.post("http://localhost:3000/prtracks/addToLib/createLib",{name:lib_name},{withCredentials:true});
  //     toast(response.data.msg);
  //   }catch(err){
  //     console.log(err);
  //   }
  // }

  // const add_a_lib =async()=>{
  //   setLibraries((prev)=>)
  //   try {
  //     await createLib_inDB();
  //   } catch (error) {
      
  //   }
  // }

//   const add_a_lib = async () => {
//   // Generate a temporary ID (negative to avoid conflicts)
//   const tempId = -Date.now();

//   // Optimistically update state
//   setLibraries(prev => [
//     ...(prev || []), // Ensure prev is always an array
//     { id: tempId, name: lib_name, problems: [] }
//   ]);

//   try {
//     const response = await axios.post(
//       "http://localhost:3000/prtracks/createLib",
//       { name: lib_name },
//       { withCredentials: true }
//     );

//     if (!response.data.lib || !response.data.lib.id) {
//       console.error("Invalid backend response:", response.data);
//       return;
//     }else{
//       console.log(`response from db`,response.data.msg);
//     }

//     // Replace temporary ID with actual ID from backend
//     setLibraries(prev =>
//       prev.map(lib =>
//         lib.id === tempId ? { ...lib, id: response.data.library.id } : lib
//       )
//     );
//     closeModalOflib();
//   } catch (error) {
//     console.error("Error adding library:", error);
    
//     // Remove temp entry if the API request fails
//     setLibraries(prev => prev.filter(lib => lib.id !== tempId));
//   }
// };
const handleAddLibrary = async () => {
  const tempId = -Date.now(); // Ensure it's a number
  const newLibrary: Library = { id: tempId, name: lib_name, problems: [] };

  setLibraries(prev => [...prev, newLibrary]); // No more type error

  try {
    const response = await axios.post(
      "https://forceright-bnd.onrender.com/prtracks/createLib",
      { name: lib_name },
      { withCredentials: true }
    );

    console.log("Backend response:", response.data); 

    if (!response.data.lib || typeof response.data.lib.id !== "number") {
      console.error("Invalid backend response:", response.data);
      return;
    }

    setLibraries(prev =>
      prev.map(lib => (lib.id === tempId ? { ...lib, id: response.data.lib.id } : lib))
    );
    setLib_name("");
    closeModalOflib();
  } catch (error) {
    console.error("Error adding library:", error);
    setLibraries(prev => prev.filter(lib => lib.id !== tempId)); // Remove temp entry
  }
};



  const addtrack_toLIb_inDB = async(libraryId:number,trackId:number)=>{
    try{
      const postData = {
        libraryId,
        trackId
      }
      const response = await axios.post("https://forceright-bnd.onrender.com/prtracks/addToLib",postData,{withCredentials:true});
      console.log(response.data.msg);
      toast(response.data.msg);
    }catch(err){
      toast("issues occured")
    }
  }
  
  const removeTrack_fromLIb_db = async(libraryId:number,trackId:number)=>{
    try{
      const postData = {
        libraryId,
        trackId
      }
      const response = await axios.post("https://forceright-bnd.onrender.com/prtracks/removeFromLib",postData,{withCredentials:true});
      console.log(response.data.msg);
      toast(response.data.msg);
    }catch(err){
      toast("issues occured");
    }
  }

  const addTrackToLibrary = async(track: TrackInterface, libraryID: number) => {
    let already_exists = false;
    setLibraries(prevLibraries =>
      prevLibraries.map(library =>{
        if(library.id === libraryID){
          if(library.problems.some(t=>t.id === track.id)){
            already_exists = true;
            return library;
          }
          return {
            ...library,
            problems:[...library.problems,track]
          }
        }
        return library
      })
    );
    if(already_exists){
      toast(`this track already exists in the library with id ${libraryID}`);
      return;
    }
    try{
      addtrack_toLIb_inDB(libraryID,track.id);
    }catch(err){
      console.log(err);
    }
    closeModal();
  };

  const removeTrackFromLibrary = async(libraryID: number, trackId: number) => { // trackId is a number
    setLibraries(prevLibraries =>
      prevLibraries.map(library =>
        library.id === libraryID
          ? {
              ...library,
              problems: library.problems.filter(track => track.id !== trackId) // Filtering by number ID
            }
          : library
      )
    );
     try{
      await removeTrack_fromLIb_db(libraryID,trackId);
     }catch(err){
      console.log(err)
     }
  };

  const handleLibraryClick = (libraryID: number) => {
    setSelectedLibrary(libraryID);
  };

  return (
    <div className="min-h-screen p-8 flex flex-col gap-10">
      {/* Library List */}
      <div className="absolute top-16 right-10">
        <ToastContainer/>
      </div>
      <div className="absolute top-16 right-10"
        onClick={()=>openModalOflib()}
      >
        <TooltipProvider>
                    <Tooltip delayDuration={200}>
                        <TooltipTrigger>
                        <IoIosAddCircleOutline className="h-12 w-12"/>
                        </TooltipTrigger>
                        <TooltipContent>
                        <p>add Library</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
      </div>
      <div className="mt-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {libraries.map((lib) => (
            <LIbraryComp key={lib.id} name={lib.name} onClick={() => handleLibraryClick(lib.id)} />
          ))}
        </div>
      </div>

      {/* Dynamic Section */}
      <div>
        <div className="flex flex-col gap-4">
          {selectedLibrary !== null ? (
            <LibraryDetails
              libraryid={selectedLibrary}
              onBack={() => setSelectedLibrary(null)}
              tracks={libraries.find(lib => lib.id === selectedLibrary)?.problems || []}
              //@ts-ignore
              removeTrack={removeTrackFromLibrary}
            />
          ) : (
            <>
              <div className="flex flex-col gap-4">
                <h1 className="text-3xl mb-6"> 🚀 last completed tracks -</h1>
                {tracks?.map((track) => (
                  <div key={track.id} className="border p-2 rounded mb-2 bg-white flex items-center justify-between cursor-pointer"
                  onClick={()=>{
                    nav(`/track/${track.id}`)
                  }}
                  >
                    <div>{track.problemLink}</div>
                    <button
                      
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(track)}}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Add to Library
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* The Modal */}

      <Modal
        isOpen={isLibModalOpen}
        onRequestClose={closeModalOflib}
        style={customStyles}
        contentLabel="Create a new Library"
      >
        <div className="gap-4 flex flex-row items-center">
          <input type="text" placeholder="Enter name" className="shadow  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={lib_name} onChange={(e)=>setLib_name(e.target.value)}/>
           <button className="border py-1 px-2 w-14 bg-lime-200 rounded"
             onClick={()=>handleAddLibrary()}
           >ok</button>
        </div>
        <button onClick={closeModalOflib} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4">
          Close
        </button>
      </Modal>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add to Library Modal"
      >
        <h2 style={{ marginBottom: '15px' }}>Add {selectedTrack?.problemLink} to Library</h2>
        <div className="grid grid-cols-5 gap-10 mb-20">
          {libraries.map(library => (
            <button
              key={library.id}
              onClick={() => selectedTrack && addTrackToLibrary(selectedTrack, library.id)}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              style={{ minWidth: '100px' }}
            >
              {library.name}
            </button>
          ))}
        </div>
        <button onClick={closeModal} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Close
        </button>
      </Modal>
    </div>
  );
};

const LibraryDetails = ({ libraryid, onBack, tracks, removeTrack }: { libraryid: number; onBack: () => void; tracks: TrackInterface[]; removeTrack: (libraryID: number, trackId: string) => void; }) => {
  const nav = useNavigate();
  return (
    <div className="p-6 gray-100 rounded-lg">
      <button onClick={onBack} className="mb-4 text-blue-500 underline">
        Back
      </button>
      <h2 className="text-xl font-bold">Content of Library {libraryid}</h2>
      <div className="flex flex-col gap-3 mt-4">
        {tracks.map((track) => (
          <div key={track.id} className="border p-2 rounded mb-2 bg-white flex justify-between items-center cursor-pointer"
          onClick={()=>{
            nav(`/track/${track.id}`)
          }}
          >
            {track.problemLink}
            <button onClick={(e) => 
              //@ts-ignore
              {
                e.stopPropagation();
                //@ts-ignore
                removeTrack(libraryid, track.id)}} className="text-red-500">Remove</button> {/* track.id is a number */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;
// ------------------------ the gemini [doesnt work]

// import React, { useState } from "react";
// import LIbraryComp from "@/comps/LIbraryComp";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import { v4 as uuidv4 } from 'uuid';

// interface Track {
//   id: string;
//   content: string;
// }

// interface Library {
//   [libraryName: string]: Track[];
// }

// const Library = () => {
//   const [selectedLibrary, setSelectedLibrary] = useState<string | null>(null);
//   const [libraries, setLibraries] = useState<Library>({
//     "cfContest 103": [],
//     "neetCode 150": [],
//     "CSES 150": [],
//   });
//   const [tracks, setTracks] = useState<Track[]>([
//     { id: uuidv4(), content: "Track 1" },
//     { id: uuidv4(), content: "Track 2" },
//     { id: uuidv4(), content: "Track 3" },
//     { id: uuidv4(), content: "Track 4" },
//     { id: uuidv4(), content: "Track 5" },
//   ]);

//   const handleLibraryClick = (name: string) => {
//     setSelectedLibrary(name);
//   };

//   const onDragEnd = (result: any) => {
//     if (!result.destination) {
//       return;
//     }

//     const { source, destination } = result;

//     if (source.droppableId === destination.droppableId) {
//       return; // No reordering within the same library for now
//     }

//     const trackId = result.draggableId; // This is the correct ID now
//     const libraryName = destination.droppableId;

//     const updatedLibraries = { ...libraries };
//     const draggedTrack = tracks.find(track => track.id === trackId);

//     if (draggedTrack && !updatedLibraries[libraryName].find(track => track.id === draggedTrack.id)) {
//       updatedLibraries[libraryName] = [...updatedLibraries[libraryName], draggedTrack];
//       setLibraries(updatedLibraries);
//     }
//   };


//   const removeTrackFromLibrary = (libraryName: string, trackId: string) => {
//     const updatedLibraries = { ...libraries };
//     updatedLibraries[libraryName] = updatedLibraries[libraryName].filter(track => track.id !== trackId);
//     setLibraries(updatedLibraries);
//   };

//   return (
//     <div className="min-h-screen p-8 flex flex-col gap-10">
//       {/* Library List */}
//       <div>
//         <div className="grid grid-cols-6 gap-6">
//           {Object.keys(libraries).map((name) => (
//             <LIbraryComp key={name} name={name} onClick={() => handleLibraryClick(name)} />
//           ))}
//         </div>
//       </div>

//       {/* Dynamic Section */}
//       <div>
//         <div className="flex flex-col gap-4">
//           {selectedLibrary ? (
//             <LibraryDetails
//               name={selectedLibrary}
//               onBack={() => setSelectedLibrary(null)}
//               tracks={libraries[selectedLibrary]}
//               removeTrack={removeTrackFromLibrary}
//             />
//           ) : (
//             <>
//               <div className="flex flex-col gap-4">
//                 <h1 className="text-3xl mb-6"> 🚀 last completed tracks -</h1>
//                 <DragDropContext onDragEnd={onDragEnd}>
//                   <Droppable droppableId="tracks">
//                     {(provided) => (
//                       <div {...provided.droppableProps} ref={provided.innerRef}>
//                         {tracks.map((track, index) => (
//                           <Draggable key={track.id} draggableId={track.id} index={index}>
//                             {(provided) => { // Correct structure here!
//                               return ( // Explicitly return a single React element
//                                 <div
//                                   {...provided.draggableProps}
//                                   {...provided.dragHandleProps}
//                                   ref={provided.innerRef}
//                                   className="border p-2 rounded mb-2 bg-white flex items-center cursor-move"
//                                 >
//                                   <div>{track.content}</div>
//                                 </div>
//                               );
//                             }}
//                           </Draggable>
//                         ))}
//                         {provided.placeholder}
//                       </div>
//                     )}
//                   </Droppable>
//                 </DragDropContext>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const LibraryDetails = ({ name, onBack, tracks, removeTrack }: { name: string; onBack: () => void; tracks: Track[]; removeTrack: (libraryName: string, trackId: string) => void; }) => {
//   return (
//     <div className="p-6 gray-100 rounded-lg">
//       <button onClick={onBack} className="mb-4 text-blue-500 underline">
//         Back
//       </button>
//       <h2 className="text-xl font-bold">{name} Content</h2>
//       <div className="flex flex-col gap-3 mt-4">
//         {tracks.map((track) => (
//           <div key={track.id} className="border p-2 rounded mb-2 bg-white flex justify-between items-center">
//             {track.content}
//             <button onClick={() => removeTrack(name, track.id)} className="text-red-500">Remove</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Library;


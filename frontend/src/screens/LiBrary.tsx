

import  { useEffect, useState } from "react";
import axios from "axios";
// import { v4 as uuidv4 } from 'uuid';
import Modal from 'react-modal';
import { TrackInterface } from "@/store/atoms";
import { useRecoilValue} from "recoil";
import { useNavigate } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";
import {toast, ToastContainer} from "react-toastify"
import LibraryTree from "@/comps/LibraryTree";
import LastCompletedInfinite from "@/comps/LastCompletedInfinite";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export interface Library {
  id: number;
  name: string;
  children ?: Library[];
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
  // const nav = useNavigate();
  
  const backEnd_url = "https://forceright-backend-1.onrender.com";
  // const dev_url = "http://localhost:8080";
  
  const fetchLibraries = async () => {
    try {
      if(tracks) console.log("there are tracks on library page")
      const response = await axios.get(`${backEnd_url}/prtracks/getLibs`, { withCredentials: true });
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

  // const openModal = (track: TrackInterface) => {
  //   setSelectedTrack(track);
  //   setIsModalOpen(true);
  // };

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
  const addtrack_toLIb_inDB = async(libraryId:number,trackId:number)=>{
    try{
      const postData = {
        libraryId,
        trackId
      }
      const response = await axios.post(`${backEnd_url}/prtracks/addToLib`,postData,{withCredentials:true});
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
      const response = await axios.post(`${backEnd_url}/prtracks/removeFromLib`,postData,{withCredentials:true});
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

  const [selectedParentId, setSelectedParentId] = useState<number | null>(null);

  const handleAddSubLibrary = (parentId: number) => {
      setSelectedParentId(parentId);
        openModalOflib();
    };


  const handleAddLibrary = async () => {
    const tempId = -Date.now();
    const newLibrary: Library = { 
        id: tempId, 
        name: lib_name, 
        problems: [],
        children: [] 
    };

    setLibraries(prev => {
        if (selectedParentId) {
            // Add to parent library
            return prev.map(lib => {
                if (lib.id === selectedParentId) {
                    return {
                        ...lib,
                        children: [...(lib.children || []), newLibrary]
                    };
                }
                return lib;
            });
        }
        // Add as root library
        return [...prev, newLibrary];
    });

    try {
        const response = await axios.post(
            `${backEnd_url}/prtracks/createLib`,
            { 
                name: lib_name,
                parentId: selectedParentId 
            },
            { withCredentials: true }
        );

        if (!response.data.lib || typeof response.data.lib.id !== "number") {
            throw new Error("Invalid backend response");
        }

        setLibraries(prev => updateLibraryId(prev, tempId, response.data.lib.id));
        setLib_name("");
        setSelectedParentId(null);
        closeModalOflib();
    } catch (error) {
        console.error("Error adding library:", error);
        setLibraries(prev => removeLibraryById(prev, tempId));
        toast.error("Failed to create library");
    }
};


  const updateLibraryId = (libraries: Library[], oldId: number, newId: number): Library[] => {
    return libraries.map(lib => {
        if (lib.id === oldId) {
            return { ...lib, id: newId };
        }
        if (lib.children) {
            return {
                ...lib,
                children: updateLibraryId(lib.children, oldId, newId)
            };
        }
        return lib;
    });
};

  const removeLibraryById = (libraries: Library[], id: number): Library[] => {
    return libraries.filter(lib => {
        if (lib.id === id) return false;
        if (lib.children) {
            lib.children = removeLibraryById(lib.children, id);
        }
        return true;
    });
};
const handleMoveLibrary = async (draggedId: number, newParentId: number | null) => {
  try {
      // Optimistically update UI
      setLibraries(prev => moveLibraryInTree(prev, draggedId, newParentId));

      // Call backend
      await axios.post(
          `${backEnd_url}/prtracks/updateLibraryParent`,
          { libraryId: draggedId, newParentId,},
          { withCredentials: true }
      );
      fetchLibraries(); // Optionally re-fetch to sync
  } catch (err) {
      toast.error("Failed to move library");
      fetchLibraries();
  }
};

function moveLibraryInTree(libs: Library[], draggedId: number, newParentId: number | null): Library[] {
  let dragged: Library | null = null;

  // Remove dragged from tree
  function remove(libList: Library[]): Library[] {
      return libList.filter(lib => {
          if (lib.id === draggedId) {
              dragged = lib;
              return false;
          }
          if (lib.children) {
              lib.children = remove(lib.children);
          }
          return true;
      });
  }
  let newLibs = remove([...libs]);

  // Add to new parent or root
  if (dragged) {
      if (newParentId === null) {
          newLibs.push(dragged);
      } else {
          function addToParent(libList: Library[]): boolean {
              for (let lib of libList) {
                  if (lib.id === newParentId) {
                      lib.children = [...(lib.children || []), dragged!];
                      return true;
                  }
                  if (lib.children && addToParent(lib.children)) return true;
              }
              return false;
          }
          addToParent(newLibs);
      }
  }
  return newLibs;
}

const handleDeleteLibrary = async (libraryId: number) => {
  try {
      setLibraries(prev => removeLibraryById(prev, libraryId));
      await axios.post(
          `${backEnd_url}/prtracks/deleteLibrary`,
          { libraryId,},
          { withCredentials: true }
      );
      fetchLibraries();
  } catch (err) {
      toast.error("Failed to delete library");
      fetchLibraries();
  }
};

  return (
    <div className="min-h-screen p-8 flex flex-col gap-10">
      {/* Library List */}
      <div className="fixed top-16 right-10 z-50">
        <ToastContainer/>
      </div>
      <div className="fixed top-16 right-10 z-50"
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

      {/* Main Content Area */}
      <div className="flex gap-8">
        {/* Left Sidebar - Library Tree */}
        <div className="w-1/4 min-w-[250px]">
          <div className="bg-white shadow-lg rounded-lg">
            <LibraryTree
                libraries={libraries}
                onSelectLibrary={handleLibraryClick}
                onAddSubLibrary={handleAddSubLibrary}
                onMoveLibrary={handleMoveLibrary}
                onDeleteLibrary={handleDeleteLibrary}
            />
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1">
          {selectedLibrary !== null ? (
            <LibraryDetails
              libraryid={selectedLibrary}
              onBack={() => setSelectedLibrary(null)}
              tracks={libraries.find(lib => lib.id === selectedLibrary)?.problems || []}
              removeTrack={removeTrackFromLibrary}
            />
          ) : (
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h1 className="text-2xl font-semibold mb-6">🚀 Last Completed Tracks</h1>
              {/* <div className="space-y-4">
                {tracks?.map((track) => (
                  <div 
                    key={track.id} 
                    className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow flex items-center justify-between cursor-pointer bg-white"
                    onClick={() => nav(`/track/${track.id}`)}
                  >
                    <div className="font-medium text-gray-700">{track.problemLink}</div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(track)
                      }}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
                    >
                      Add to Library
                    </button>
                  </div>
                ))}
              </div> */}
              <LastCompletedInfinite />
            </div>
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

const LibraryDetails = ({ libraryid, onBack, tracks, removeTrack }: { libraryid: number; onBack: () => void; tracks: TrackInterface[]; removeTrack: (libraryID: number, trackId: number) => void; }) => {
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

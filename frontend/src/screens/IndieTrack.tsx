
import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { track,  TrackInterface, dbTracksState } from "@/store/atoms";
import { AiFillDelete } from "react-icons/ai";
import ImplementationEditor from "@/comps/ImplementationEditor";
import axios from "axios";
import { CombinedTracks } from "@/store/atoms";
import {toast, ToastContainer} from 'react-toastify';
import ConfirmDeleteModal from "@/comps/ConfirmDeleteModal";
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
  const [showDeleteModal,setShowDeleteModal] = useState(false);
  
    const backEnd_url = "https://forceright-backend-1.onrender.com";
  // const dev_url = "http://localhost:8080";

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

   
  // delete the whole track >> 
  const handleDelete = async () => {
     if(!currentTrack) return;
     setShowDeleteModal(true);
  };
  const confirmDelete = async()=>{
    if(!currentTrack)return;
    setShowDeleteModal(false);
     const removedId = currentTrack.id;
    setAllTracksState(prev => prev.filter(t => t.id !== removedId));

    try {
      await axios.post(
        `${backEnd_url}/prtracks/deleteTrack`,
        { id: removedId },
        { withCredentials: true }
      );
      toast.success("Track deleted");
      setTimeout(()=>{
        nav("/home");
      },2000)
    } catch (err) {
      console.error("delete error:", err);
      toast.error("Failed to delete track. Refreshing data.");
      window.location.reload();
    }
  }
  const cancelDelete =()=>{
    setShowDeleteModal(false);
  }
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
    const response = await axios.patch(`${backEnd_url}/prtracks/mytracks/edit/${Number(id)}`,currentTrack,{withCredentials:true});
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
            nav("/home");
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
      <button className="absolute top-16 right-6 px-4 py-2 rounded bg-blue-500 text-white"
      onClick={handleDelete}
      >
        Delete Track
      </button>
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

      {/* Modal to confirm deletion of a track */}
      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        title="Delete track?"
        message="This will permanently delete the track and cannot be undone. Are you sure?"
        confirmLabel="Delete permanently"
        cancelLabel="Keep track"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default IndieTrack;

import Router from "express";
import { getAllProblemsTrack ,deleteProblemTrack,createProblemTrack,getMyproblemTracks,getMyspecificTrack,updateLibraryParent,updateMySpecificTrack, getProblemsByDate, getRatingsEachDate, createLibrary, getMyLibraries, putTrackInLibrary, removeTrackFromLibrary,DeleteLibraryController} from "../controllers/problemController";
import { authOnProblemPost } from "../niddlewares/midware_OnProblem";
const problem_Router = Router();
problem_Router.get("/",getAllProblemsTrack);
problem_Router.get("/getBydate",getProblemsByDate)
problem_Router.get("/getRatings",getRatingsEachDate)
problem_Router.get("/mytracks",authOnProblemPost,getMyproblemTracks);
problem_Router.post("/createPr",authOnProblemPost,createProblemTrack);
problem_Router.get("/mytracks/:id",authOnProblemPost,getMyspecificTrack);
problem_Router.patch("/mytracks/edit/:id",authOnProblemPost,updateMySpecificTrack);
problem_Router.post("/createLib",authOnProblemPost,createLibrary);
problem_Router.get("/getLibs",authOnProblemPost,getMyLibraries);
problem_Router.post("/updateLibraryParent",authOnProblemPost,updateLibraryParent);
problem_Router.post("/deleteLibrary",authOnProblemPost,DeleteLibraryController);
problem_Router.post("/addToLib",authOnProblemPost,putTrackInLibrary);
problem_Router.post("/removeFromLib",authOnProblemPost,removeTrackFromLibrary);
problem_Router.post("/deleteTrack", authOnProblemPost, deleteProblemTrack);
export default problem_Router;
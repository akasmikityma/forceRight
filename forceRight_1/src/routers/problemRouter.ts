import Router from "express";
import { getAllProblemsTrack ,createProblemTrack,getMyproblemTracks,getMyspecificTrack,updateMySpecificTrack, getProblemsByDate, getRatingsEachDate, createLibrary, getMyLibraries, putTrackInLibrary, removeTrackFromLibrary} from "../controllers/problemController";
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


problem_Router.post("/addToLib",authOnProblemPost,putTrackInLibrary);
problem_Router.post("/removeFromLib",authOnProblemPost,removeTrackFromLibrary);
export default problem_Router;
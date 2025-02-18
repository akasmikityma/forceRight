import { Router } from "express";
import { getUserController,logout_Controller,me_controller,signIn_Controller,signUp_Controller,updatePassController } from "../controllers/userController";
import { authOnProblemPost } from "../niddlewares/midware_OnProblem";
const userRouter = Router();

userRouter.get("/getUsers", getUserController);
userRouter.post("/signUP", signUp_Controller);
userRouter.post("/signIN", signIn_Controller);
userRouter.patch("/edit",updatePassController);
userRouter.get("/auth/me",authOnProblemPost,me_controller);
userRouter.post("/auth/logout",authOnProblemPost,logout_Controller)
export default userRouter;

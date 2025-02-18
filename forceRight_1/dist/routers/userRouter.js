"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const midware_OnProblem_1 = require("../niddlewares/midware_OnProblem");
const userRouter = (0, express_1.Router)();
userRouter.get("/getUsers", userController_1.getUserController);
userRouter.post("/signUP", userController_1.signUp_Controller);
userRouter.post("/signIN", userController_1.signIn_Controller);
userRouter.patch("/edit", userController_1.updatePassController);
userRouter.get("/auth/me", midware_OnProblem_1.authOnProblemPost, userController_1.me_controller);
userRouter.post("/auth/logout", midware_OnProblem_1.authOnProblemPost, userController_1.logout_Controller);
exports.default = userRouter;

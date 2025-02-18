import express from "express";
import userRouter from "./routers/userRouter";
import problem_Router from "./routers/problemRouter";
import dotenv from "dotenv"
import cors from "cors";
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use('/user', userRouter);
app.use('/prtracks',problem_Router);
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});

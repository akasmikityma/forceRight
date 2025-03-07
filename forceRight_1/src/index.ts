// import express from "express";
// import userRouter from "./routers/userRouter";
// import problem_Router from "./routers/problemRouter";
// import dotenv from "dotenv"
// import cors from "cors";
// import cookieParser from 'cookie-parser';
// dotenv.config();
// const app = express();
// app.use(
//   cors({
//     origin: "http://localhost:5173", // Your frontend URL
//     credentials: true,
//   })
// );
// app.use(cookieParser());
// app.use(express.json());
// app.use('/user', userRouter);
// app.use('/prtracks',problem_Router);
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`server is running on http://localhost:${PORT}`);
// });
import express from "express";
import userRouter from "./routers/userRouter";
import problem_Router from "./routers/problemRouter";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://force-rightapp.vercel.app",
  "https://forceright-backend-1.onrender.com"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/user", userRouter);
app.use("/prtracks", problem_Router);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
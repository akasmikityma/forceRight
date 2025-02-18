import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.SECRET_KEY as string;

export const authOnProblemPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.authToken;
    
    if (!token) {
      res.status(401).json({ msg: "Access token is missing" });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { email: string; id: number };
    
    console.log("Decoded JWT:", decoded);

    // Attach email and user id to the request body for further processing
    req.body.email = decoded.email;
    req.body.userId = decoded.id; // Pass userId to next() middleware

    next();
  } catch (err) {
    console.error("JWT Verification Error:", err);
    res.status(403).json({ msg: "Invalid or expired token" });
  }
};

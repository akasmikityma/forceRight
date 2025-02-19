import { Request, Response } from "express";
// import { users } from "../alltheusers";
import DBClient from "../utils/prismaClient";
 const prisma = DBClient.getInstance().prisma;
 import bcrypt from 'bcrypt';
 import cookieParser from "cookie-parser";
 import jwt from "jsonwebtoken";
// get the users 
const JWT_SECRET = process.env.SECRET_KEY as string;
console.log(JWT_SECRET);

export const getUserController =async (req: Request, res: Response) => {
    try{
        const users =await prisma.user.findMany();
        console.log(users);
        res.status(200).json({
            msg:"users fetched",
            users : users
        })
    }catch(err:any){
        console.log(err);
        res.status(401).json({
            msg: "coudnt find the users for u .. might be some issues there internally"
        })
    }
};

//               prev implementation 
// export const signIn_Controller = async(req:Request, res:Response)=>{
//   try {
//     const { email, password } = req.body;

//     // Find the user by email
//     const found_user = await prisma.user.findUnique({
//       where: { email },
//       select: { name: true, password: true },
//     });

//     if (!found_user) {
//        res.status(404).json({ msg: "User not found!" });
//     }

//     // Validate password
//     if (password !== found_user?.password) {
//        res.status(401).json({ msg: "Invalid credentials!" });
//     }

//     // Generate JWT
//     const JWT_SECRET = process.env.SECRET_KEY as string;
//     const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "4h" });

//     // Set token in the response header
//     res
//       .status(200)
//       .setHeader("Authorization", `Bearer ${token}`)
//       .json({
//         msg: `Welcome back, ${found_user?.name}!`,
//         token
//       });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       msg: "Internal server error. Please try again later.",
//     });
//   }
// }

export const signIn_Controller = async (req: Request, res: Response) => {
  try {
    const { email, password ,userId} = req.body;

    const found_user = await prisma.user.findUnique({
      where: { email:email,
        id:userId
       },
      select: { name: true, password: true, id: true },
    });

    console.log(found_user);

    if (!found_user) {
      res.status(404).json({ msg: "User not found!" });
      return;
    }

    // Validate password
    //@ts-ignore
    const isMatch = await bcrypt.compare(password, found_user.password);
    if (!isMatch) {
      res.status(401).json({ msg: "Invalid credentials!" });
      return;
    }

    // Generate JWT with both `email` and `id`
    const token = jwt.sign(
      { email, id: found_user.id }, // Include id in payload
      JWT_SECRET,
      { expiresIn: "4h" }
    );

    // Set HTTP-only cookie
    // res.cookie("authToken", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production", // Use HTTPS in production
    //   sameSite: "strict",
    //   maxAge: 4 * 60 * 60 * 1000, // 4 hours
    // });
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure only in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Allow cross-origin in production
      maxAge: 4 * 60 * 60 * 1000, // 4 hours
    });
    // res.cookie("authToken", token, {
    //   httpOnly: true,
    //   secure: true, // Must be true for SameSite=None to work in HTTPS
    //   sameSite: "None", // Allow cross-origin cookie sharing
    //   maxAge: 4 * 60 * 60 * 1000, // 4 hours
    // });
    

    res.status(200).json({ msg: `Welcome back, ${found_user.name}!` });
  } catch (err:any) {
    console.error(err);
    res.status(500).json({ msg: "Internal server error." });
  }
};



//              prev implementation >> 
// export const signUp_Controller = async (req: Request, res: Response) => {
//     const { name, age, email, password } = req.body;
  
//     console.log(name, age, email, password);
  
//     try {
//       // Await the Prisma call to create the user
//       const new_user = await prisma.user.create({
//         data: {
//           name: name,
//           age: age,
//           email: email,
//           password: password,
//         },
//       });
//       const JWT_SECRET = process.env.SECRET_KEY as string;
//       const token = jwt.sign({email:email},JWT_SECRET,{expiresIn:"4h"});
//       console.log(new_user);
      
//       // Return the created user
//       res.status(201)
//       .setHeader("Authorization",`Bearer ${token}`)
//       .json({
//         msg: "user successFully signed UP",
//         user : new_user
//       });
//     } catch (err) {
//       console.error(err);
  
//       res.status(500).json({
//         msg: "There is some issue that is causing a mishap",
//       });
//     }
//   };
  
export const signUp_Controller = async (req: Request, res: Response) => {
  try {
    const { name, age, email, password } = req.body;

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    const new_user = await prisma.user.create({
      data: {
        name,
        age,
        email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ email,id:new_user.id }, JWT_SECRET, { expiresIn: "4h" });

    // Set HTTP-only cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 4 * 60 * 60 * 1000,
    });

    res.status(201).json({ msg: "User successfully signed up" });
  } catch (err:any) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

export const me_controller = async (req: Request, res: Response) => {
  try {
      if (!req.body.email || !req.body.userId) {
           res.status(401).json({ msg: "You are not logged in" });
           return;
      }
      
       res.status(200).json({ email: req.body.email }); // Send a valid response only once
  } catch (err:any) {
       res.status(500).json({ msg: "Server error" });
  }
};


export const logout_Controller = (req: Request, res: Response) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.json({ msg: "Logged out successfully" });
};

  export const updatePassController = async(req:Request, res:Response) =>{
    try{
      // get the email and pass word and check if there's a row that has the same email >> 
      const {email , password} = req.body;
      const found_user =await prisma.user.findUnique({
        where :{
          email : email
        }
      })      
      console.log(found_user);
      const updated_User = await prisma.user.update({
        where:{
          email :email
        },
        data:{
          password : password
        }
      })
      res.status(201).json({
        msg:"password updated",
        updatedUeser: updated_User
      })
    }catch(err:any){
        console.log(err);
        res.status(500).json({
          data:"some internal error happend"
        })
    }
  }
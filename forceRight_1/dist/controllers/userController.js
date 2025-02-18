"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassController = exports.logout_Controller = exports.me_controller = exports.signUp_Controller = exports.signIn_Controller = exports.getUserController = void 0;
// import { users } from "../alltheusers";
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
const prisma = prismaClient_1.default.getInstance().prisma;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// get the users 
const JWT_SECRET = process.env.SECRET_KEY;
console.log(JWT_SECRET);
const getUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany();
        console.log(users);
        res.status(200).json({
            msg: "users fetched",
            users: users
        });
    }
    catch (err) {
        console.log(err);
        res.status(401).json({
            msg: "coudnt find the users for u .. might be some issues there internally"
        });
    }
});
exports.getUserController = getUserController;
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
const signIn_Controller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const found_user = yield prisma.user.findUnique({
            where: { email },
            select: { name: true, password: true, id: true },
        });
        console.log(found_user);
        if (!found_user) {
            res.status(404).json({ msg: "User not found!" });
            return;
        }
        // Validate password
        //@ts-ignore
        const isMatch = yield bcrypt_1.default.compare(password, found_user.password);
        if (!isMatch) {
            res.status(401).json({ msg: "Invalid credentials!" });
            return;
        }
        // Generate JWT with both `email` and `id`
        const token = jsonwebtoken_1.default.sign({ email, id: found_user.id }, // Include id in payload
        JWT_SECRET, { expiresIn: "4h" });
        // Set HTTP-only cookie
        res.cookie("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use HTTPS in production
            sameSite: "strict",
            maxAge: 4 * 60 * 60 * 1000, // 4 hours
        });
        res.status(200).json({ msg: `Welcome back, ${found_user.name}!` });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Internal server error." });
    }
});
exports.signIn_Controller = signIn_Controller;
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
const signUp_Controller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, age, email, password } = req.body;
        // Hash the password before storing
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const new_user = yield prisma.user.create({
            data: {
                name,
                age,
                email,
                password: hashedPassword,
            },
        });
        const token = jsonwebtoken_1.default.sign({ email, id: new_user.id }, JWT_SECRET, { expiresIn: "4h" });
        // Set HTTP-only cookie
        res.cookie("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 4 * 60 * 60 * 1000,
        });
        res.status(201).json({ msg: "User successfully signed up" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
});
exports.signUp_Controller = signUp_Controller;
const me_controller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.email) {
            res.status(401).json({ msg: "You are not logged in" });
            return;
        }
        res.status(200).json({ email: req.body.email }); // Send a valid response only once
    }
    catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});
exports.me_controller = me_controller;
const logout_Controller = (req, res) => {
    res.clearCookie("authToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
    res.json({ msg: "Logged out successfully" });
};
exports.logout_Controller = logout_Controller;
const updatePassController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get the email and pass word and check if there's a row that has the same email >> 
        const { email, password } = req.body;
        const found_user = yield prisma.user.findUnique({
            where: {
                email: email
            }
        });
        console.log(found_user);
        const updated_User = yield prisma.user.update({
            where: {
                email: email
            },
            data: {
                password: password
            }
        });
        res.status(201).json({
            msg: "password updated",
            updatedUeser: updated_User
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            data: "some internal error happend"
        });
    }
});
exports.updatePassController = updatePassController;

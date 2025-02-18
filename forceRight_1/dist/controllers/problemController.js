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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTrackFromLibrary = exports.putTrackInLibrary = exports.getMyLibraries = exports.createLibrary = exports.getAllProblemsTrack = exports.updateMySpecificTrack = exports.getProblemsByDate = exports.getRatingsEachDate = exports.getMyspecificTrack = exports.getMyproblemTracks = exports.createProblemTrack = void 0;
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
const client_1 = require("@prisma/client");
const prisma = prismaClient_1.default.getInstance().prisma;
const createProblemTrack = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { problemLink, initialThoughts, logic, implementations, logicGap, implementationGap, solution, status, rating, email, tags, timeTakenMinutes, difficulty } = req.body;
        const found_user = yield prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (!found_user) {
            res.status(404).json({
                msg: "user not found"
            });
        }
        const newTrack_pr = yield prisma.problem.create({
            data: {
                problemLink, initialThoughts, logic, implementations, solution, implementationGap, logicGap, rating, status, timeTakenMinutes, difficulty, tags,
                user: {
                    connect: { id: found_user === null || found_user === void 0 ? void 0 : found_user.id }
                }
            }
        });
        res.status(201).json({
            msg: `a track has been created with id ${newTrack_pr.id}`
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: " Internal Server Error "
        });
    }
});
exports.createProblemTrack = createProblemTrack;
// personalized tracks fetching >>> 
const getMyproblemTracks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // the middleware sends the email to this controller >>> 
        const { email } = req.body;
        const tracks = yield prisma.problem.findMany({
            where: {
                user: {
                    email: email
                }
            }
        });
        if (!tracks) {
            res.status(403).json({
                msg: "cound not fetch your tracks"
            });
        }
        else {
            res.status(200).json({
                msg: "these are your problem tracks >> ",
                tracks: tracks
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Internal Server Error"
        });
    }
});
exports.getMyproblemTracks = getMyproblemTracks;
const getMyspecificTrack = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log(Number(id));
        const the_track = yield prisma.problem.findUnique({
            where: {
                id: Number(id)
            }
        });
        if (!the_track) {
            res.status(404).json({
                msg: "coudn't find the track .. may try after some time"
            });
        }
        else {
            res.status(200).json({
                msg: "track fetched successfully",
                track: the_track
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Internal Server Error"
        });
    }
});
exports.getMyspecificTrack = getMyspecificTrack;
const getRatingsEachDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Rating_data = yield prisma.problem.findMany({
            select: {
                rating: true,
                createdAt: true
            },
            orderBy: {
                createdAt: "asc"
            }
        });
        if (!Rating_data) {
            res.status(404).json({
                msg: "couldnt find the data u are looking"
            });
            return;
        }
        res.status(200).json({
            rating_data: Rating_data
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Internal Server Error"
        });
        return;
    }
});
exports.getRatingsEachDate = getRatingsEachDate;
const getProblemsByDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prByData = yield prisma.problem.groupBy({
            by: ['createdAt'],
            _count: { id: true },
            _sum: { timeTakenMinutes: true },
            where: {
                // status:'SOLVED'
                createdAt: {
                    gte: new Date(new Date().getFullYear(), 0, 1),
                }
            },
            orderBy: { createdAt: 'asc' }
        });
        if (!prByData) {
            res.status(400).json({
                msg: "there is no suitable result for ur request"
            });
            return;
        }
        res.status(200).json({
            tracks: prByData
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Internal Server Error"
        });
        return;
    }
});
exports.getProblemsByDate = getProblemsByDate;
const updateMySpecificTrack = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const _a = req.body, { email } = _a, updates = __rest(_a, ["email"]); // Destructure and exclude `email` from updates
        // Check if updates are empty
        if (Object.keys(updates).length === 0) {
            res.status(400).json({ msg: "No fields provided to update" });
        }
        const updatedTrack = yield prisma.problem.update({
            where: { id: parseInt(id) },
            data: updates,
        });
        res.status(200).json({
            msg: "Track updated successfully",
            data: updatedTrack,
        });
    }
    catch (err) {
        if (err instanceof client_1.Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
            res.status(404).json({ msg: "Track not found" });
        }
        console.error(err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});
exports.updateMySpecificTrack = updateMySpecificTrack;
const getAllProblemsTrack = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProblems_track = yield prisma.problem.findMany();
        if (!allProblems_track) {
            res.status(403).json({
                msg: "cant fetch the problems track "
            });
        }
        else {
            res.status(200).json({
                msg: "problem tracks fetched successfully >> ",
                count: allProblems_track.length,
                tracks: allProblems_track
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Internal Server Error"
        });
    }
});
exports.getAllProblemsTrack = getAllProblemsTrack;
const createLibrary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, userId } = req.body;
    console.log(`name and userId in the createLib`, name, userId);
    try {
        // console.log(`name `,name,`id : `,userId);
        const new_lib = yield prisma.library.create({
            data: {
                name: name,
                userId: userId
            }
        });
        if (!new_lib) {
            res.status(403).json({
                msg: "couldnt create a library try later"
            });
            return;
        }
        res.status(201).json({
            msg: `Library created Successfully with id ${new_lib.id}`,
            lib: new_lib
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Internal issues Occured"
        });
    }
});
exports.createLibrary = createLibrary;
const getMyLibraries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const all_Libs = yield prisma.library.findMany({
            where: { userId: userId },
            select: {
                id: true,
                name: true,
                problems: {
                    select: {
                        problem: {
                            select: {
                                id: true,
                                problemLink: true,
                                initialThoughts: true,
                                logic: true,
                                implementations: true,
                                logicGap: true,
                                implementationGap: true,
                                solution: true,
                                tags: true,
                                difficulty: true,
                                timeTakenMinutes: true,
                                status: true,
                                rating: true,
                                userId: true,
                                createdAt: true,
                                updatedAt: true,
                            }
                        }
                    }
                }
            }
        });
        // 🔥 Flatten the `problems` array inside each library
        const formattedLibs = all_Libs.map(lib => (Object.assign(Object.assign({}, lib), { problems: lib.problems.map(p => p.problem) // Extract problem directly
         })));
        if (!all_Libs) {
            res.status(404).json({
                msg: "coudnt find the libraries for you "
            });
            return;
        }
        res.status(200).json({
            msg: "libraries fetched successfully",
            libraries: formattedLibs
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Internal issues occured"
        });
    }
});
exports.getMyLibraries = getMyLibraries;
const putTrackInLibrary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { trackId, libraryId, userId } = req.body;
        console.log(`trackID ${trackId} userId ${userId} libraryId ${libraryId}`);
        const lib = yield prisma.library.findUnique({
            where: {
                id: libraryId
            }
        });
        if (!lib) {
            res.status(404).json({
                msg: "there is no such library"
            });
            return;
        }
        if (lib.userId !== userId) {
            res.status(401).json({
                msg: " UNAUTHORIZED : you are not the owner of this library"
            });
            return;
        }
        const foundProblem = yield prisma.problem.findUnique({
            where: {
                id: trackId
            }
        });
        if (!foundProblem) {
            res.status(404).json({
                msg: "UNAUTHORIZED : the problem is not found"
            });
            return;
        }
        // const check = await 
        const rec = yield prisma.libraryProblem.create({
            data: {
                problemId: foundProblem.id,
                libraryId: lib.id
            },
        });
        res.status(201).json({
            msg: `problem track is successfully put in the library ${lib.name}`
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Internal Error"
        });
    }
});
exports.putTrackInLibrary = putTrackInLibrary;
const removeTrackFromLibrary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // same like putting >> 
        // check if all the data exist and the userId is relevant with the rest data provided >> 
        const { libraryId, userId, trackId } = req.body;
        console.log(`trackID ${trackId} userId ${userId} libraryId ${libraryId}`);
        const lib = yield prisma.library.findUnique({
            where: {
                id: libraryId
            }
        });
        if (!lib) {
            res.status(404).json({
                msg: "there is no such library"
            });
            return;
        }
        if (lib.userId !== userId) {
            res.status(401).json({
                msg: " UNAUTHORIZED : you are not the owner of this library"
            });
            return;
        }
        const foundProblem = yield prisma.problem.findUnique({
            where: {
                id: trackId
            }
        });
        if (!foundProblem) {
            res.status(404).json({
                msg: "UNAUTHORIZED : the problem is not found"
            });
            return;
        }
        const remove_rec = yield prisma.libraryProblem.delete({
            where: {
                libraryId_problemId: {
                    libraryId: libraryId,
                    problemId: trackId,
                }
            }
        });
        if (!remove_rec) {
            res.status(204).json({ msg: "couldnt remove the track" });
        }
        res.status(200).json({
            msg: `the track with trackId ${trackId} is removed from the library with libraryId ${libraryId}`
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Internal Issues occured" });
    }
});
exports.removeTrackFromLibrary = removeTrackFromLibrary;

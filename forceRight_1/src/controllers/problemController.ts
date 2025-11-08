import { Request,Response } from "express"
import DBClient from "../utils/prismaClient";
import { Prisma } from "@prisma/client";
 const prisma = DBClient.getInstance().prisma;

 export const createProblemTrack = async(req:Request,res :Response)=>{
    try{
        const {problemLink,initialThoughts,logic,implementations,logicGap,implementationGap,solution,status,rating,email,tags,timeTakenMinutes,difficulty} = req.body;
        const found_user = await prisma.user.findUnique({
            where:{
                email:email
            }
        })
        if(!found_user){
            res.status(404).json({
                msg:"user not found"
            })
        }

        const newTrack_pr = await prisma.problem.create({
            data:{
                problemLink,initialThoughts,logic,implementations,solution,implementationGap,logicGap,rating,status,timeTakenMinutes,difficulty,tags,
                user:{
                    connect:{id:found_user?.id}
                }
            }
        })
        res.status(201).json({
            msg: `a track has been created with id ${newTrack_pr.id}` 
        })
    }catch(err:any){
        console.log(err);
        res.status(500).json({
            msg:" Internal Server Error "
        })
    }
}

// personalized tracks fetching >>> 
export const getMyproblemTracks =async(req:Request,res:Response)=>{
    try{
        // the middleware sends the email to this controller >>> 
        console.log("this is in getMyProblemTracks and the userId is ",req.body.userId);
        // const {email} = req.body;
        const userId = req.body.userId;
        const page = Math.max(1, Number(req.query.page) || 1);
        const pageSize = Math.min(100, Number(req.query.pageSize) || 10);
        // const tracks = await prisma.problem.findMany({
        //     where:{
        //         user:{
        //             email:email
        //         }
        //     }
        // })
        const [tracks, total] = await Promise.all([
            prisma.problem.findMany({
                where: { userId },
                orderBy: { updatedAt: 'desc' }, // or createdAt/completedAt if available
                skip: (page - 1) * pageSize,
                take: pageSize,
            }),
            prisma.problem.count({ where: { userId } }),
        ]);
        // if(!tracks){
        //     res.status(403).json({
        //         msg:"cound not fetch your tracks"
        //     })
        // }else{
        //     res.status(200).json({
        //         msg:"these are your problem tracks >> ",
        //         tracks : tracks
        //     })
        // }
        const hasMore = (page * pageSize) < total;
        res.status(200).json({ tracks, page, pageSize, total, hasMore });
    }catch(err:any){
        console.log(err);
        res.status(500).json({
            msg:"Internal Server Error"
        })
    }
}

export const getMyspecificTrack=async(req:Request ,res:Response) =>{
    try{
        const {id} = req.params;
        console.log(Number(id));
        const the_track = await prisma.problem.findUnique({
            where:{
                id:Number(id)
            }
        })
        if(!the_track){
            res.status(404).json({
                msg:"coudn't find the track .. may try after some time"
            })
        }else{
            res.status(200).json({
                msg:"track fetched successfully",
                track: the_track
            })
        }
    }catch(err:any){
        console.log(err);
        res.status(500).json({
            msg:"Internal Server Error"
        })
    }
}

export const getRatingsEachDate=async(req:Request,res:Response)=>{
    try{
        const Rating_data = await prisma.problem.findMany({
            select:{
                rating:true,
                createdAt:true
            },
            orderBy:{
                createdAt:"asc"
            }
        })
        if(!Rating_data){
            res.status(404).json({
                msg:"couldnt find the data u are looking"
            })
            return;
        }
        res.status(200).json({
            rating_data:Rating_data
        })
    }catch(err:any){
        console.log(err)
        res.status(500).json({
            msg:"Internal Server Error"
        })
        return;
    }
}

export const getProblemsByDate = async(req:Request,res:Response)=>{
    try{
        const prByData = await prisma.problem.groupBy({
            by:['createdAt'],
            _count:{id:true},
            _sum:{timeTakenMinutes:true},
            where:{
                // status:'SOLVED'
                createdAt:{
                    gte:new Date(new Date().getFullYear(),0,1),
                }
            },
            orderBy:{createdAt:'asc'}
        });
        if(!prByData){
            res.status(400).json({
                msg:"there is no suitable result for ur request"
            })
            return ;
        }
        res.status(200).json({
            tracks:prByData
        })
    }catch(err:any){
        console.log(err);
        res.status(500).json({
            msg:"Internal Server Error"
        })
        return;
    }
} 

export const updateMySpecificTrack = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { email, ...updates } = req.body; // Destructure and exclude `email` from updates

        // Check if updates are empty
        if (Object.keys(updates).length === 0) {
             res.status(400).json({ msg: "No fields provided to update" });
        }

        const updatedTrack = await prisma.problem.update({
            where: { id: parseInt(id) },
            data: updates,
        });

        res.status(200).json({
            msg: "Track updated successfully",
            data: updatedTrack,
        });
    } catch (err:any) {
        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
             res.status(404).json({ msg: "Track not found" });
        }

        console.error(err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const getAllProblemsTrack = async(req:Request , res:Response)=>{
    try{
        const allProblems_track = await prisma.problem.findMany();
        if(!allProblems_track){
            res.status(403).json({
                msg:"cant fetch the problems track "
            })
        }else{
            res.status(200).json({
                msg:"problem tracks fetched successfully >> ",
                count:allProblems_track.length,
                tracks : allProblems_track
            })
        }
    }catch(err:any){
        console.log(err);
        res.status(500).json({
            msg: "Internal Server Error"
        })
    }
} 

export const createLibrary = async(req:Request,res:Response)=>{
    const {name,userId,parentId} = req.body;
    console.log(`name and userId in the createLib`,name,userId);
    try{    
        // console.log(`name `,name,`id : `,userId);
        // if parentId is provided, check if it exists
        if(parentId){
            const parentLib = await prisma.library.findUnique({
                where:{
                    id:parentId
                }
            })

            if(!parentLib){
                res.status(404).json({
                    msg:"parent Library not found"
                });
                return;
            }

            if(parentLib.userId !== userId){
                res.status(403).json({
                    msg:"UNAUTHORIZED : you are not the owner of this library"
                });
                return 
            }
        }
        const new_lib = await prisma.library.create({
            data:{
                name:name,
                userId:userId,
                parentId:parentId || null, // Set to null if parentId is not provided
            }
        })
        if(!new_lib){
            res.status(403).json({
                msg:"couldnt create a library try later"
            })
            return;
        }
        res.status(201).json({
            msg:`Library created Successfully with id ${new_lib.id}`,
            lib: new_lib
        })
    }catch(err:any){
        console.log(err);
        res.status(500).json({
            msg:"Internal issues Occured"
        })
    }
}

// delete a library >> 
export const DeleteLibraryController = async(req:Request,res:Response)=>{
    try{
        const {libraryId,userId} = req.body;
        const foundLib = await prisma.library.findUnique({
            where:{
                id:libraryId
            }
        })
        if(!foundLib){
            res.status(404).json({
                msg:"no library found with that id"
            })
            return;
        }
        if(foundLib.userId !== userId){
            res.status(403).json({
                msg:"Unauthorized"
            })
            return ;
        }

        await prisma.library.delete({
            where:{
                id:libraryId
            }
        })
        res.status(200).json({
            msg:"Library and its children successfully are deleted >>"
        })
    }catch(err:any){
        console.log(err);
        res.status(500).json({
            msg:"Internal Server Error"
        })
    }
} 

export const updateLibraryParent = async (req: Request, res: Response) => {
    try {
        const { libraryId, newParentId, userId } = req.body;

        // Find the library to update
        const library = await prisma.library.findUnique({
            where: { id: libraryId }
        });

        if (!library) {
             res.status(404).json({ msg: "Library not found" });
             return;
        }

        if (library.userId !== userId) {
            res.status(403).json({ msg: "UNAUTHORIZED: You don't own this library" });
            return;
        }

        // If newParentId is null or undefined, make it a root library
        if (!newParentId) {
            const updatedLibrary = await prisma.library.update({
                where: { id: libraryId },
                data: { parentId: null }
            });
            res.status(200).json({
                msg: "Library is now a parent (root) library",
                library: updatedLibrary
            });
            return;
        }

        // Otherwise, move under a new parent (with checks)
        if (libraryId === newParentId) {
            res.status(400).json({ msg: "Cannot set library as its own parent" });
            return;
        }

        const newParent = await prisma.library.findUnique({
            where: { id: newParentId }
        });

        if (!newParent) {
             res.status(404).json({ msg: "Parent library not found" });
             return;
        }

        if (newParent.userId !== userId) {
             res.status(403).json({ msg: "UNAUTHORIZED: You don't own the parent library" });
             return;
        }

        // Prevent circular reference
        let currentParent = newParent;
        while (currentParent.parentId) {
            if (currentParent.parentId === libraryId) {
                 res.status(400).json({ msg: "Cannot create circular reference in library hierarchy" });
                 return;
            }
            currentParent = await prisma.library.findUnique({
                where: { id: currentParent.parentId }
            }) as any;
        }

        const updatedLibrary = await prisma.library.update({
            where: { id: libraryId },
            data: { parentId: newParentId }
        });

        res.status(200).json({
            msg: "Library parent updated successfully",
            library: updatedLibrary
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Internal Server Error" });
        return ;
    }
};

export const getMyLibraries = async(req: Request, res: Response) => {
    try {
        const { userId } = req.body;
        
        // Get all root libraries (those without parents) for this user
        const rootLibraries = await prisma.library.findMany({
            where: { 
                userId,
                parentId: null
            },
            include: {
                Children: {
                    include: {
                        Children: true,
                        problems: {
                            include: {
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
                },
                problems: {
                    include: {
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

        // Format the response to flatten problem arrays
        const formatLibrary = (lib: any) => ({
            ...lib,
            problems: lib.problems?.map((p: any) => p.problem) || [],
            children: lib.Children?.map((child: any) => formatLibrary(child)) || []
        });

        const formattedLibs = rootLibraries.map(formatLibrary);

        if (!rootLibraries.length) {
            res.status(200).json({
                msg: "No libraries found",
                libraries: []
            });
            return;
        }

        res.status(200).json({
            msg: "Libraries hierarchy fetched successfully",
            libraries: formattedLibs
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const putTrackInLibrary = async(req:Request, res:Response)=>{
    try{
        const {trackId,libraryId ,userId} = req.body;
        console.log(`trackID ${trackId} userId ${userId} libraryId ${libraryId}`);
        
        const lib = await prisma.library.findUnique({
            where:{
                id:libraryId
            }
        })
        if(!lib){
            res.status(404).json({
                msg:"there is no such library"
            })
            return;
        }
        if(lib.userId !== userId) {
            res.status(401).json({
                msg:" UNAUTHORIZED : you are not the owner of this library"
            })
            return;
        }
        const foundProblem = await prisma.problem.findUnique({
            where:{
                id:trackId
            }
        })
        if(!foundProblem){
            res.status(404).json({
                msg:"UNAUTHORIZED : the problem is not found"
            })
            return;
        }
        // const check = await 
        const rec = await prisma.libraryProblem.create({
            data:{
                problemId:foundProblem.id,
                libraryId:lib.id
            },
        }) 
        res.status(201).json({
            msg:`problem track is successfully put in the library ${lib.name}`
        })
    }catch(err:any){
        console.log(err);
        res.status(500).json({
            msg:"Internal Error"
        })
    }
}

export const removeTrackFromLibrary = async(req:Request, res:Response)=>{
   try{
    // same like putting >> 
    // check if all the data exist and the userId is relevant with the rest data provided >> 

    const {libraryId, userId, trackId} = req.body;
    console.log(`trackID ${trackId} userId ${userId} libraryId ${libraryId}`);
        
        const lib = await prisma.library.findUnique({
            where:{
                id:libraryId
            }
        })
        if(!lib){
            res.status(404).json({
                msg:"there is no such library"
            })
            return;
        }
        if(lib.userId !== userId) {
            res.status(401).json({
                msg:" UNAUTHORIZED : you are not the owner of this library"
            })
            return;
        }
        const foundProblem = await prisma.problem.findUnique({
            where:{
                id:trackId
            }
        })
        if(!foundProblem){
            res.status(404).json({
                msg:"UNAUTHORIZED : the problem is not found"
            })
            return;
        }
        
        const remove_rec = await prisma.libraryProblem.delete({
            where:{
                libraryId_problemId:{
                    libraryId:libraryId,
                    problemId:trackId,
                }
            }
        })
        if(!remove_rec){
            res.status(204).json({msg:"couldnt remove the track"});
        }
        res.status(200).json({
            msg:`the track with trackId ${trackId} is removed from the library with libraryId ${libraryId}`
        })
   }catch(err:any){
      console.log(err);
      res.status(500).json({msg:"Internal Issues occured"});
   }
}
export const deleteProblemTrack = async (req: Request, res: Response) => {
  try {
    // Accept id from body or params
    const idFromBody = req.body?.id;
    const idFromParams = req.params?.id;
    const id = Number(idFromBody ?? idFromParams);
    const userId = req.body.userId;

    if (!id || isNaN(id)) {
       res.status(400).json({ msg: "Invalid track id" });
       return;
    }

    const track = await prisma.problem.findUnique({ where: { id } });
    if (!track) {
      res.status(404).json({ msg: "Track not found" });
    return ;
    }

    if (track.userId !== userId) {
      res.status(403).json({ msg: "UNAUTHORIZED: you don't own this track" });
        return ;
    }

    // Delete track (Prisma will throw if record not found)
    await prisma.problem.delete({ where: { id } });

    res.status(200).json({ msg: "Track deleted successfully", id });
    return ;
} catch (err: any) {
    console.error("deleteProblemTrack error:", err);
    res.status(500).json({ msg: "Internal Server Error" });
    return ;
}
};
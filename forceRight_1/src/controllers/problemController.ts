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
        const {email} = req.body;

        const tracks = await prisma.problem.findMany({
            where:{
                user:{
                    email:email
                }
            }
        })
        if(!tracks){
            res.status(403).json({
                msg:"cound not fetch your tracks"
            })
        }else{
            res.status(200).json({
                msg:"these are your problem tracks >> ",
                tracks : tracks
            })
        }
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
    const {name,userId} = req.body;
    console.log(`name and userId in the createLib`,name,userId);
    try{    
        // console.log(`name `,name,`id : `,userId);
        const new_lib = await prisma.library.create({
            data:{
                name:name,
                userId:userId
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

export const getMyLibraries = async(req:Request,res:Response)=>{
    try{
        const {userId} = req.body;
        const all_Libs = await prisma.library.findMany({
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
        const formattedLibs = all_Libs.map((lib:any) => ({
            ...lib,
            problems: lib.problems.map((p:any) => p.problem) // Extract problem directly
        }));
        if(!all_Libs){
            res.status(404).json({
                msg:"coudnt find the libraries for you "
            })
            return ;
        }
        res.status(200).json({
            msg:"libraries fetched successfully",
            libraries : formattedLibs
        })
    }catch(err:any){
        console.log(err);
        res.status(500).json({
            msg:"Internal issues occured"
        })
    }
}

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
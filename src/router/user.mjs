import { Router } from "express";
import { users } from "../utility/constant";


const userRouter = Router();




userRouter.get("/",(req,res)=>{
    res.json({message:"server working correctly"}).send()
})



export default userRouter
import { Router } from "express";
import { users } from "../utility/constant.mjs";


const userRouter = Router();




userRouter.get("/",(req,res)=>{
    res.json({message:"server working correctly"}).send()
})


userRouter.get("/users",(req,res)=>{
    const {id} = req.query;

    const user = checkingId(id)

    if(user)
        return res.json(user)
    else
        return res.json({message:"not exist"})

})



export default userRouter


function checkingId (id){
    const result = users.find(value=>value.id === parseInt(id))
    if(result)
        return result
    else
        return false
}


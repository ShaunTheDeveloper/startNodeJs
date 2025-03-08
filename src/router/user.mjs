import { Router } from "express";
import express from "express";
import { users } from "../utility/constant.mjs";
import { query,body,param,validationResult } from "express-validator";
import validateUserRequest from "../validation/user.mjs";


const userRouter = Router();

userRouter.use(express.json())



const parsingId = (req,res,next)=>{
    
    const id = req.query.id;
    if(id){
        req.id = parseInt(req.query.id);
    }
    
    next();
}

const validateExistingUserId = (req,res,next)=>{

    if(req.method === "POST"){
        const result = checkingId(req.id)
        if(result){
            return res.json("this id exist use another")
        }else{
            next()
        }
    }


    const {id} = req
    const result = checkingId(id)
    if(result){
        req.user = result;
        next()
    }else{
        
        return res.json("user with this id not founded")
    }
}


userRouter.use(validateUserRequest);
userRouter.use("/users/id",parsingId);
userRouter.use("/users/id",validateExistingUserId);








userRouter.get("/",(req,res)=>{
    res.json({message:"server working correctly"}).send()
})


userRouter.get("/users",(req,res)=>{
    return res.send(users)
})


userRouter.get("/users/id",(req,res)=>{
    const {user} = req;
    return res.json(user)
})

userRouter.get("/users/id/products",(req,res)=>{
    const {user} = req
    return res.json(user.products);
})

userRouter.post("/users/id/update",(req,res)=>{
    const {userName,password,products} = req.body
    const {id} = req

    
    const newUser = {id,userName,password,products}
    users.push(newUser);
    return res.json(newUser)
    
})


userRouter.patch("/users/id",(req,res)=>{
    const {id,user} = req;
    const {userName,password,products} = req.body

    const index = users.indexOf(user)

    
    const updated = {id,userName:userName||users.userName,password:password||user.password,products:products||user.products}
    users[index] = updated
    return res.json(updated);
    
})


userRouter.delete("/users/id",(req,res)=>{
    const {id,user} = req;

    
    const index= users.indexOf(user);
    const deletedUser = users.splice(index,1);
    return res.json(deletedUser)
    
    
})



export default userRouter


function checkingId (id){
    const result = users.find(value=>value.id === id)
    if(result)
        return result
    else
        return false
}



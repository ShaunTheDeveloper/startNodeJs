import express from "express"
import { Router } from "express";
import { users } from "../../utility/constant.mjs";
import { ifIdExist,ifIdNotExist,parsingId,checkValidationResult } from "./middleware.mjs";
import {validateIdField,validateUserNameField,validatePasswordField} from "./validation.mjs";
import { checkSchema,matchedData } from "express-validator";
import cookieParser, { signedCookie } from "cookie-parser";



const userRouter = Router();



userRouter.use(express.json())
userRouter.use(cookieParser("secret"))





userRouter.get("/",(req,res)=>{
    res.json({message:"server working correctly"}).send()
})


userRouter.get("/users",(req,res)=>{
    return res.send(users)
})


userRouter.get("/users/id",
    checkSchema(validateIdField),
    checkValidationResult,
    parsingId,
    ifIdExist,
    (req,res)=>{
    const {user} = req;
    return res.json(user)
})

userRouter.get("/users/id/products",checkSchema(validateIdField),checkValidationResult,parsingId,ifIdExist,(req,res)=>{
    const {user} = req
    return res.json(user.products);
})

userRouter.post("/users/id/update",
    checkSchema(validateIdField),
    checkSchema(validateUserNameField),
    checkSchema(validatePasswordField),
    checkValidationResult,
    parsingId,
    ifIdNotExist,
    (req,res)=>{
    const {userName,password,products} = req.body
    const {id} = req

    
    const newUser = {id,userName,password,products}
    users.push(newUser);
    return res.json(newUser)
    
})


userRouter.patch("/users/id",
    checkSchema(validateIdField),
    checkSchema(validateUserNameField),
    checkSchema(validatePasswordField),
    checkValidationResult,
    parsingId,
    ifIdExist,
    (req,res)=>{
    const {id,user} = req;
    const {userName,password,products} = req.body

    const index = users.indexOf(user)

    
    const updated = {id,userName:userName||users.userName,password:password||user.password,products:products||user.products}
    users[index] = updated
    return res.json(updated);
    
})


userRouter.delete("/users/id",
    checkSchema(validateIdField),
    checkValidationResult,
    parsingId,
    ifIdExist,
    (req,res)=>{
    const {id,user} = req;

    
    const index= users.indexOf(user);
    const deletedUser = users.splice(index,1);
    return res.json(deletedUser)
    
    
})


userRouter.post("/users/login/",checkSchema(validateUserNameField),checkSchema(validatePasswordField),checkValidationResult,(req,res)=>{
    const {userName,password} = matchedData(req)
    res.cookie("userName",userName,{maxAge:60000});
    res.cookie("password",password,{maxAge:60000,signed:true})
    return res.json("success")
})



userRouter.get("/users/login/status",(req,res)=>{
    const {userName} = req.cookies;
    const {password} = req.signedCookies;
    console.log(userName);
    console.log(password);

    if(userName && password){
        return res.json("you sign in to your account your id is ")
    }else{
        return res.json("you need to sign in to your account ")
    }
    
})



export default userRouter






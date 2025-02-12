import { Router } from "express";
import express from "express";
import { users } from "../utility/constant.mjs";


const userRouter = Router();

userRouter.use(express.json())







userRouter.get("/",(req,res)=>{
    res.json({message:"server working correctly"}).send()
})


userRouter.get("/users",(req,res)=>{
    return res.send(users)
})


userRouter.get("/users/:id",(req,res)=>{
    const {id} = req.params;

    const user = checkingId(id)

    if(user)
        return res.json(user)
    else
        return res.json({message:"not exist"})

})

userRouter.get("/users/:id/products",(req,res)=>{
    const id = parseInt(req.params.id);

    const user = checkingId(id);
    const index = findIndex(user);

    return res.json(users[index].products);
})


userRouter.post("/users",(req,res)=>{
    const {id,userName,password,products} = req.body

    const user = checkingId(id);

    if(user){
        return res.json({message:"user with this id exist"})
    }else{
        const newUser = {id,userName,password,products}
        users.push(newUser);
        return res.json({message:"successful"})
    }
})


userRouter.patch("/users/:id",(req,res)=>{
    const id = parseInt(req.params.id)
    const {userName,password,products} = req.body
    const user = checkingId(id);

    if(user){
        const index = users.indexOf(user);
        const updated = {id,userName:userName||users.userName,password:password||user.password,products:products||user.products}
        users[index] = updated
        return res.json(updated);
    }else{
        return res.json("not founded")
    }
})


userRouter.delete("/users/:id",(req,res)=>{
    const id  = parseInt(req.params.id);

    const user = checkingId(id);

    if(user){
        const index= users.indexOf(user);
        const deletedUser = users.splice(index,1);
        return res.json(deletedUser)
    }else{
        return res.json("not founded")
    }
})



export default userRouter


function checkingId (id){
    const result = users.find(value=>value.id === parseInt(id))
    if(result)
        return result
    else
        return false
}


function findIndex(id){
    const user = users.find((value)=>value.id===id)

    return users.indexOf(user);
}


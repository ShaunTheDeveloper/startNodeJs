
import { users } from "../../utility/constant.mjs";
import { validationResult } from "express-validator";



export const checkValidationResult = (req,res,next)=>{
    const result = validationResult(req);

    if(result.errors.length === 0 ){
        next()
    }else{
        return res.json(result)
    }
}



export const parsingId = (req,res,next)=>{
    
    const id = req.query.id;
    if(id){
        if(!isNaN(id)){
            req.id = parseInt(req.query.id);
            next()
        }
    }else{
        return res.json("invalid id")
    }
    
    
}

export const ifIdExist = (req,res,next)=>{
    const {id} = req;
    const result = users.find((user)=>user.id === id);
    if(result){
        req.user = result;
        next();
    }else{
        return res.json("id not founded in database")
    }

}

export const ifIdNotExist = (req,res,next)=>{
    const {id} = req;
    const result = users.find((user)=>user.id === id);
    if(result){
        return res.json("this id exist in database")
    }else{
        next();
    }

}



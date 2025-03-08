import { body,query,validationResult } from "express-validator"



const userNameField = 'userName'
const passwordField = 'password'
const idField = "id"
const evaluateUserName = body(userNameField).isString().withMessage(`${userNameField} must be string value`).notEmpty().withMessage(`${userNameField} can not be empty`).isLength({min:8 ,max:16}).withMessage(`${userNameField} length must be minimum 8 char maximum 16 char`)
const evaluatePassword = body(passwordField).notEmpty().withMessage(`${passwordField} cant no be empty`).isLength({min:8,max:32}).withMessage(`${passwordField} must be at least 8 char to 32 char`).isStrongPassword({minSymbols:1}).withMessage("use strong password at least one symbol")
const evaluateId = query(idField).isNumeric().withMessage("id is not a number").notEmpty().withMessage(`id value can't be empty`).isLength({max:16}).withMessage("maximum id lenght is 16")



const validateUserRequest = async(req,res,next)=>{
    if(req.query.id)
        await evaluateId.run(req)
    if(req.body.userName)
        await evaluateUserName.run(req)
    if(req.body.password)
        await evaluatePassword.run(req)

    const result = validationResult(req);

    if(result.errors.length === 0){
        next();
    }else{
        return res.json(result)
    }
    
}


export default validateUserRequest;
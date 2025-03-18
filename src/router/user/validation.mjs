

const userNameField = 'userName'
const passwordField = 'password'
const idField = "id"

export const validateIdField = {
    [idField]:{
        in: ["query"],
        isNumeric:{errorMessage:`${idField} must be numeric`},
        notEmpty:{errorMessage:`${idField} can not be empty`},
        isLength:{options:{min:1,max:16},errorMessage:`${idField} length must be between 1 to 16`}
    }
}

export const validateUserNameField = {
    [userNameField]:{
        in: ["body"],
        isString:{errorMessage:`${userNameField} must be string value`},
        notEmpty:{errorMessage:`${userNameField} can not be empty`},
        isLength:{options:{min:8,max:32},errorMessage:`${userNameField} length must be between 8 to 32`}
    }
}


export const validatePasswordField = {
    [passwordField]:{
        in: ["body"],
        isString:{errorMessage:`${passwordField} must be string value`},
        notEmpty:{errorMessage:`${passwordField} can not be empty`},
        isLength:{options:{min:8,max:32},errorMessage:`${userNameField} length must be between 8 to 32`},
        isStrongPassword:{errorMessage:"use strong password"}
    }
}
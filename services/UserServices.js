//#region imports
const { reject } = require('bcrypt/promises');
const res = require('express/lib/response');
const {GenericHelpers, PasswordHelper}  = require('../helpers')
const {
    Inputs: {User: {UserRegisterDTO, UserLoginDTO}}
    ,Outputs: {User: {RegisteredUser, LoggedUser}}
    ,Domain: {User}} = require('../models')

   
//#endregion imports

//#region passwordMethods
const checkPasswordNotNull = (password, output) => GenericHelpers.FieldNullOrEmpty(password,output);

const checkPasswordEquals = (password, repassword, output) => {
    if(password !== repassword){
        output.statusCode = 422
        output.messages = [...output.messages, 'Passwords are not equal.']
        return false
    }
    return true
}

const checkPasswordLength = (password, output) => {
    if(!(password.length >= 6 && password.length <= 20)){
        output.statusCode = 422
        output.messages = [...output.messages, 'Passwords length [6-20].']
        return false
    }
    return true
};
//#endregion

//#region User
const findUserByEmail = (input, output) => new Promise((resolve, reject) => {

    GenericHelpers.FieldsNullOrEmpty(input, output)

    if(output.statusCode !== 422 && output.statusCode > 0){
        User.findOne({email: input.email, isActive: true}).exec()
        .then(u => {
            if(u !== null){
                output.statusCode = 200
                resolve(u)
            }else{
                output.statusCode = 404
                output.messages = [...output.messages, "user not found."]
                reject(output)
            }
        })
    }else{
        reject(output)
    }
})
//#endregion

module.exports = {
    CreateAccount: (userRegisterDTO) => new Promise((resolve, reject)=>{
        let input = Object.assign(new UserRegisterDTO(), userRegisterDTO)
        let output = new RegisteredUser(input)

        GenericHelpers.FieldsNullOrEmpty(input, output)

        if(output.statusCode !== 422 && output.statusCode > 0){
            if(checkPasswordEquals(input.password, input.repassword, output) && checkPasswordLength(input.password, output)){

                User
                .findOne({email: input.email})
                .exec()
                .then(u => {
                    if(u !== null){
                        output.statusCode = 409
                        output.messages = [...output.messages, `account by email ${output?.data?.email} already taken.`]
                        reject(output)
                    }else{
                        
                        PasswordHelper.EncryptPassword(input.password)
                        .then(p => {
                            input.password = p
                            User.create(input)
                            output.statusCode = 201
                            output.messages = [...output.messages, `Welcome ${ output?.data?.email}.`]
                            resolve(output)
                        })
                    }
                })

            }
        }else{
            reject(output)
        }
    }),
    LoginAccount: (userLoginDTO) => new Promise((resolve, reject) => {
        const input = Object.assign(new UserLoginDTO(), userLoginDTO)
        const output = new LoggedUser(input)
        findUserByEmail(input,output)
        .then(userData => {
            PasswordHelper.VerifyPassword(input.password,userData.password)
            .then(isCorrect => {
                if(isCorrect)
                {
                    output.data = {
                        email: userData.email,
                        name: userData.name,
                        lastName: userData.lastName,
                        token: 'Bearer'
                    }
                    output.statusCode = 200
                    output.messages = [...output.messages, `Welcome ${output.data.name} ${output.data.lastName}.`]
                    resolve(output)
                }else{
                    output.statusCode = 403
                    output.messages = [...output.messages, 'password incorrect.']
                    reject(output)
                }
            })
        })

    })
}
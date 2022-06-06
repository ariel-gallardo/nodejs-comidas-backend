const res = require('express/lib/response');
const {GenericHelpers: {FieldNullOrEmpty, FieldsNullOrEmpty}}  = require('../helpers')
const {
    Inputs: {User: {UserRegisterDTO, UserLoginDTO}}
    ,Outputs: {User: {RegisteredUser}}
    ,Domain: {User}} = require('../models')

//#region passwordMethods
const checkPasswordNotNull = (password, output) => FieldNullOrEmpty(password,output);

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

module.exports = {
    CreateAccount: (userRegisterDTO) => new Promise((resolve, reject)=>{
        let input = Object.assign(new UserRegisterDTO(), userRegisterDTO)
        let output = new RegisteredUser(input)

        FieldsNullOrEmpty(input, output)

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
                        User.create(input)
                        output.statusCode = 201
                        output.messages = [...output.messages, `Welcome ${ output?.data?.email}.`]
                        resolve(output)
                    }
                })

            }
        }else{
            reject(output)
        }
    }),
    LoginAccount: (userLoginDTO) => {
        const input = Object.assign(new UserLoginDTO(), userLoginDTO)

        console.log(input)
    }
}
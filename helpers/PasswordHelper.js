const bcrypt = require('bcrypt');
const {JWT_TOKEN} = require('dotenv').config().parsed
const jwt = require('jsonwebtoken')

module.exports = {
    EncryptPassword: (password) => new Promise((resolve, reject )=> {
        bcrypt.genSalt()
        .then(salt => {
            bcrypt.hash(password,salt)
            .then(result => {
                resolve(result)
            })
        })
    }),
    DecryptPassword: (password) => {
        
    },
    VerifyPassword: (password, hash) => new Promise((resolve, reject) => {
        bcrypt.compare(password,hash)
        .then(r => resolve(r))
    }),
    GenerateToken: (data) => jwt.sign(data,JWT_TOKEN),
    DecodeToken: (token) => jwt.decode(token,JWT_TOKEN)
}
const bcrypt = require('bcrypt');

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
    })
}
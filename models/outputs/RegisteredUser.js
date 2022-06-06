const Output = require('./Output.js')

class RegisteredUser{
    constructor(data){
        this.name = data?.name
        this.lastName = data?.lastName
        this.email = data?.email
    }
}

module.exports = class{

    constructor(data){
        Object.assign(this,new Output())
        this.data = new RegisteredUser(data)
    }
    
}

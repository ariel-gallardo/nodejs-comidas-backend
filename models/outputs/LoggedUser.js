const Output = require('./Output.js')

class LoggedUser{
    constructor(data){
        this.name = data?.name
        this.lastName = data?.lastName
        this.email = data?.email
        this.token = 'Bearer'
    }
}

module.exports = class{

    constructor(data){
        Object.assign(this,new Output())
        this.data = new LoggedUser(data)
    }
    
}

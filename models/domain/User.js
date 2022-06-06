const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {type: String, required:true},
    lastName: {type: String, required:true},
    email: {type: String, required:true, unique: true},
    password: {type: String, required:true},
    confirmed: {type: Boolean, required:false, default: false},
    isActive: {type: Boolean, required:false, default: true}
})

const User = mongoose.model("User",userSchema)

module.exports = User
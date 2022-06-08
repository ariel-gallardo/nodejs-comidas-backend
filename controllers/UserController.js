const {UserServices} = require('../services')

const sendOutput = (o,res) => {res.status(200).json(o)}

module.exports = {
    RegisterAccount: (req, res) => 
        UserServices
        .CreateAccount(req.body)
        .then(o => sendOutput(o,res))
        .catch(o => sendOutput(o,res))
    ,
    LoginAccount: (req,res) => 
        UserServices
        .LoginAccount(req.body)
        .then(o => sendOutput(o,res))
        .catch(o => sendOutput(o,res))
    ,
    ViewProfile: (req,res) => 
        UserServices
        .ViewProfile(req,res)
        .then(o => sendOutput(o,res))
        .catch(o => sendOutput(o,res))
}
const {UserServices} = require('../services')

const sendOutput = (o,res) => {res.status(o.statusCode).json(o)}

module.exports = {
    RegisterAccount: (req, res) => {
        UserServices
        .CreateAccount(req.body)
        .then(o => sendOutput(o,res))
        .catch(o => sendOutput(o,res))
    },
    LoginAccount: (req,res) => {
        const output = UserServices.LoginAccount(req.body)
        res
        .status(output.statusCode)
        .json(output)
    }
}
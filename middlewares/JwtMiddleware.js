const jwt = require('jsonwebtoken')
const {JWT_TOKEN} = require('dotenv').config().parsed

module.exports = (req, res, next) => {

    const token = req.header('authorization').replace("Bearer ","")

    if(!token){
        res.status(401).json({error: 'Acceso Denegado'})
    }else{
        try{
            if(jwt.verify(token,JWT_TOKEN))
            {
                res.locals.token = token
                res.locals.user = jwt.decode(token,JWT_TOKEN)
                next()
            }
        }catch(e){
            res.status(401).json()
        }
    } 
    
}
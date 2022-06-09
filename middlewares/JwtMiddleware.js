const jwt = require('jsonwebtoken')
const {JWT_TOKEN} = require('dotenv').config().parsed

module.exports = (req, res, next) => {

    let token = req.header('authorization')
    
    if(!token){
        res.status(401).json({error: 'Acceso Denegado'})
    }else{
        token = token.replace("Bearer ","")
        try{
            if(jwt.verify(token,JWT_TOKEN))
            {
                res.locals.token = token
                res.locals.user = jwt.decode(token,JWT_TOKEN)
                next()
            }
        }catch(e){
            res.status(401).json({error: 'Acceso Denegado'})
        }
    } 
    
}
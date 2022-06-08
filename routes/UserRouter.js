const router = require('express').Router()
const {UserController} = require('../controllers')
const {JWTMiddleware} = require('../middlewares')

//Public Routes
router.post('/register',UserController.RegisterAccount)
router.post('/login',UserController.LoginAccount)

//Private Routes
router.get('/profile',JWTMiddleware, UserController.ViewProfile)


module.exports = router
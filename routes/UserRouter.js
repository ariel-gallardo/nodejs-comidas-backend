const router = require('express').Router()
const {UserController} = require('../controllers')

router.post('/register',UserController.RegisterAccount)
router.post('/login',UserController.LoginAccount)

module.exports = router
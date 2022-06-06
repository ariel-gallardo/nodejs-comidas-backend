const router = require('express').Router()

router.use('/users',require('./UserRouter.js'))

module.exports = router
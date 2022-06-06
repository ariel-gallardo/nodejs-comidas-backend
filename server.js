//#region Initial Imports
const express = require('express')
const app = express()
const {SERVER_PORT,
DB_HOST, DB_PORT, DB_SCHEMA} = require('dotenv').config().parsed
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
//#endregion
 
app.use(bodyParser.urlencoded({extended: false}))
app.use('/api',require('./routes'))

mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_SCHEMA}`)
const connection = mongoose.connection

connection.on('error',console.error.bind(console, 'connection error: '))
connection.once('open', () => {
    console.log(`MongoDB running on ${DB_HOST}:${DB_PORT} && DB-> ${DB_SCHEMA}`)
    app.listen(SERVER_PORT, () => {console.log(`App running on port ${SERVER_PORT}`)})
})
  
//create express application
const express = require('express')
const app = express()

//import database connector
const mongoose = require('mongoose')

//import text to JSON parse
const bodyParser = require('body-parser')
app.use(bodyParser.json())

//set local env variable
require('dotenv/config')

//create some routes
const filmsRoute = require('./routes/filmroute.js')
app.use('/api/film',filmsRoute)

const authRoute = require('./routes/authroute.js')
app.use('/api/users',authRoute)

//database connection string
try{
    mongoose.connect(process.env.DB_CONNECTOR,{})
    console.log('Your mongoDB connector is on...')
} catch(err) {
    console.log(err)
}

app.listen(3000,()=>{
console.log('server running on 3000...')

})
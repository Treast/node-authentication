require('dotenv').config()
require('./config/database')

const express = require('express')
const app = express()
const passport = require('passport')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(passport.initialize())

require('./routes/auth')(app)

app.listen(process.env.SERVER_PORT, function () {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`)
})

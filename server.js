require('dotenv').config()
require('./config/database')

const express = require('express')
const app = express()
const passport = require('passport')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(passport.initialize())

// Authentication strategies
require('./strategies/login')
require('./strategies/register')
require('./strategies/jwt')

require('./routes/auth')(app)

app.get('/', (req, res) => {
  res.json({ message: 'Hello World !' })
})

const server = app.listen(process.env.SERVER_PORT, function () {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`)
})

module.exports = {
  app,
  server,
}

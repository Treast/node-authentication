const Sequelize = require('sequelize')
const sequelize = require('../config/database')

const User = sequelize.define('users', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  email: Sequelize.STRING,
})

module.exports = User

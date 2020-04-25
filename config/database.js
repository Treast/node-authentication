const Sequelize = require('sequelize')

const databaseName =
  process.env.NODE_ENV === 'test'
    ? process.env.DATABASE_NAME_TEST
    : process.env.DATABASE_NAME

const sequelize = new Sequelize(
  databaseName,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Europe/Paris',
    },
    logging: false,
  },
)

module.exports = sequelize

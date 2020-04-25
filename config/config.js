require('dotenv').config()

module.exports = {
  test: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME_TEST,
    host: process.env.DATABASE_HOST,
    dialect: 'mariadb',
  },
}

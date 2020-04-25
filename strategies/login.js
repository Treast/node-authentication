const bcrypt = require('bcrypt')
const User = require('../schemas/User')

const passport = require('passport'),
  LocalStrategy = require('passport-local')

passport.use(
  'loginUser',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordFiel: 'password',
      session: false,
    },
    (username, password, done) => {
      User.findOne({
        where: {
          username,
        },
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'Username not found' })
        } else {
          const saltPassword = password + process.env.SECRET_SALT
          bcrypt.compare(saltPassword, user.password).then(response => {
            if (!response) {
              return done(null, false, { message: 'Incorrect password' })
            }
            return done(null, user)
          })
        }
      })
      // .catch(err => {
      //   done(err, false)
      // })
    },
  ),
)

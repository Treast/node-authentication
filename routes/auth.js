const User = require('../schemas/User')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  JWTStrategy = require('passport-jwt').Strategy,
  ExtractJWT = require('passport-jwt').ExtractJwt

passport.use(
  'registerUser',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      session: false,
    },
    (username, password, done) => {
      try {
        User.findOne({
          where: {
            username,
          },
        }).then(user => {
          if (user !== null) {
            done(null, false, { message: 'Username is already taken' })
          } else {
            const saltPassword = password + process.env.SECRET_SALT
            bcrypt.hash(saltPassword, 12).then(hashedPassword => {
              User.create({
                username,
                password: hashedPassword,
              }).then(user => {
                return done(null, user)
              })
            })
          }
        })
      } catch (err) {
        done(err)
      }
    },
  ),
)

passport.use(
  'loginUser',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordFiel: 'password',
      session: false,
    },
    (username, password, done) => {
      try {
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
      } catch (err) {
        done(err)
      }
    },
  ),
)

module.exports = app => {
  app.get('/status', (req, res) => {
    res.status(200).send({ message: 'Server is running' })
  })

  app.post('/register', (req, res) => {
    passport.authenticate('registerUser', (err, user, info) => {
      if (err) console.log(err)

      if (info !== undefined) {
        res.status(400).send(info)
      } else {
        req.logIn(user, err => {
          const data = {
            email: req.body.email,
            created_at: Date.now(),
            updated_at: Date.now(),
          }

          user.update(data).then(() => {
            console.log('User created')
            res.status(200).send({ message: 'User created' })
          })
        })
      }
    })(req, res)
  })

  app.post('/login', (req, res) => {
    passport.authenticate('loginUser', (err, user, info) => {
      if (err) console.log(err)

      if (info !== undefined) {
        res.status(400).send(info)
      } else {
        req.logIn(user, err => {
          User.findOne({
            where: {
              username: user.username,
            },
          }).then(user => {
            const token = jwt.sign(
              {
                id: user.id,
              },
              process.env.SECRET_JWT,
            )

            res.status(200).send({
              token,
            })
          })
        })
      }
    })(req, res)
  })
}

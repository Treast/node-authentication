const User = require('../schemas/User')

const passport = require('passport'),
  JWTStrategy = require('passport-jwt').Strategy,
  ExtractJWT = require('passport-jwt').ExtractJwt

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_JWT,
}

passport.use(
  'jwt',
  new JWTStrategy(jwtOptions, (payload, done) => {
    User.findOne({
      where: {
        id: payload.id,
      },
    }).then(user => {
      if (user) {
        return done(null, user)
      }
      return done(null, false)
    })
    //   .catch(err => {
    //     return done(err, false)
    //   })
  }),
)

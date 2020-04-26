const User = require('../schemas/User')

const passport = require('passport')
const jwt = require('jsonwebtoken')

module.exports = app => {
  /**
   * @api {post} /register Register an user
   * @apiName Register
   * @apiGroup Authentication
   *
   * @apiParam {String} username Username of the User
   * @apiParam {String} password Password of the User
   *
   * @apiSuccess {String} message Message if the user is created
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "message": "User created",
   *     }
   *
   * @apiErrorExample Username is already taken:
   *     HTTP/1.1 400 BadRequest
   *     {
   *       "message": "Username is already taken"
   *     }
   *
   * @apiErrorExample Missing credentials:
   *     HTTP/1.1 400 BadRequest
   *     {
   *       "message": "Missing credentials"
   *     }
   */
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

  /**
   * @api {post} /login Login an user
   * @apiName Login
   * @apiGroup Authentication
   *
   * @apiParam {String} username Username of the User
   * @apiParam {String} password Password of the User
   *
   * @apiSuccess {String} token JWT Token
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTg3ODgyNzc5fQ.ITW828SQqBGqjZhZSO3Vb7M2EwwuZ41pfhyTj9JJa9I",
   *     }
   *
   * @apiErrorExample Username not found:
   *     HTTP/1.1 400 BadRequest
   *     {
   *       "message": "Username not found"
   *     }
   *
   * @apiErrorExample Incorrect password:
   *     HTTP/1.1 400 BadRequest
   *     {
   *       "message": "Incorrect password"
   *     }
   *
   * @apiErrorExample Missing credentials:
   *     HTTP/1.1 400 BadRequest
   *     {
   *       "message": "Missing credentials"
   *     }
   */
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

  /**
   * @api {post} /logged Test login
   * @apiName Logged
   * @apiGroup Authentication
   *
   * @apiHeader {String} Authorization Users JWT.
   *
   * @apiSuccess {String} message Message if the user is logged
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "message": "You're logged in !",
   *     }
   *
   * @apiErrorExample Missing or wrong JWT:
   *     HTTP/1.1 401 Unauthozized
   *     {
   *       "message": "Unauthozized"
   *     }
   */
  app.get(
    '/logged',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      res.status(200).send({ message: "You're logged in !" })
    },
  )
}

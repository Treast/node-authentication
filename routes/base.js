const path = require('path')

module.exports = app => {
  /**
   * @api {get} / Hello World
   * @apiName Hello
   * @apiGroup Base
   *
   * @apiSuccess {String} message Hello World !
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "message": "Hello World !",
   *     }
   */
  app.get('/', (req, res) => {
    res.json({ message: 'Hello World !' })
  })

  /**
   * @api {get} /status Server status
   * @apiName Status
   * @apiGroup Base
   *
   * @apiSuccess {String} message Server is running
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "message": "Server is running",
   *     }
   */
  app.get('/status', (req, res) => {
    res.status(200).send({ message: 'Server is running' })
  })
}

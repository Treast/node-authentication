const request = require('supertest')
const app = require('../server').app
const server = require('../server').server

describe('Server running well', () => {
  test('should return Hello World', async done => {
    const res = await request(app).get('/')

    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('message')
    expect(res.body.message).toBe('Hello World !')
    done()
  })

  test('should say that server is running', async done => {
    const res = await request(app).get('/status')

    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('message')
    expect(res.body.message).toBe('Server is running')
    done()
  })
})

afterAll(done => {
  server.close()
  done()
})

const request = require('supertest')
const app = require('../server').app
const server = require('../server').server

const userData = {
  username: 'Test',
  email: 'test@test.com',
  password: 'testtest',
  token: null,
}

describe('Auth routes', () => {
  test('should created an User', async done => {
    const res = await request(app).post('/register').send({
      username: userData.username,
      email: userData.email,
      password: userData.password,
    })

    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('message')
    expect(res.body.message).toBe('User created')
    done()
  })

  test('should said that username is taken', async done => {
    const res = await request(app).post('/register').send({
      username: userData.username,
      email: userData.email,
      password: userData.password,
    })

    expect(res.status).toEqual(400)
    expect(res.body).toHaveProperty('message')
    expect(res.body.message).toBe('Username is already taken')
    done()
  })

  test('should connect user', async done => {
    const res = await request(app).post('/login').send({
      username: userData.username,
      password: userData.password,
    })

    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('token')

    // We store the JWT token
    userData.token = res.body.token

    done()
  })

  test('should not connect user', async done => {
    const res = await request(app)
      .post('/login')
      .send({
        username: userData.username,
        password: `bad${userData.password}`,
      })

    expect(res.status).toEqual(400)
    done()
  })

  test('should not find user', async done => {
    const res = await request(app)
      .post('/login')
      .send({
        username: `bad${userData.username}`,
        password: userData.password,
      })

    expect(res.status).toEqual(400)
    expect(res.body).toHaveProperty('message')
    expect(res.body.message).toBe('Username not found')
    done()
  })

  test('should allow connected user to access protected page', async done => {
    const res = await request(app)
      .get('/logged')
      .set('Authorization', `Bearer ${userData.token}`)

    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('message')
    expect(res.body.message).toBe("You're logged in !")
    done()
  })

  test('should block access to unlogged user', async done => {
    const res = await request(app).get('/logged')

    expect(res.status).toEqual(401)
    expect(res.text).toBe('Unauthorized')
    done()
  })

  test('should block access to incorrect user', async done => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTg3ODE2NDkxfQ.WkcVc4BaJcuFJegoQ0pL2LhM0mWkVWViJn6a4We4dRE'
    const res = await request(app)
      .get('/logged')
      .set('Authorization', `Bearer ${token}`)

    expect(res.status).toEqual(401)
    expect(res.text).toBe('Unauthorized')
    done()
  })
})

afterAll(done => {
  server.close()
  done()
})

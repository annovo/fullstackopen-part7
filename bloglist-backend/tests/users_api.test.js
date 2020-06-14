const supertest = require('supertest')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('somepassword', 10)
  const user = new User({ username: 'test user', passwordHash })

  await user.save()
})

describe('creation of user', () => {
  test('new user saved to databse', async () => {
    const newUser = {
      username: 'ananas',
      name: 'An Na',
      password: 'secret'
    }

    const allUsers = await helper.usersInDb()
    const returnedUser = await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(returnedUser.body.passwordHash).not.toBeDefined()

    const usersPlusNew = await helper.usersInDb()
    expect(usersPlusNew).toHaveLength(allUsers.length + 1)
    const usernames = usersPlusNew.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('user with invalid password/username is not created', async () => {
    const invalidPassword = {
      username: 'boo',
      password: '1'
    }

    const invalidUserName = {
      username: '1',
      password: '12334556'
    }

    const users = await helper.usersInDb
    const passwordResult = await api
      .post('/api/users')
      .send(invalidPassword)
      .expect(400)
    expect(passwordResult.body.error).toContain('Password must contain at least 3 digits')

    let newUsers = await helper.usersInDb
    expect(newUsers).toHaveLength(users.length)

    const usernameResult = await api
      .post('/api/users')
      .send(invalidUserName)
      .expect(400)
    expect(usernameResult.body.error).toContain('Username must contain at least 3 digits')

    newUsers = await helper.usersInDb
    expect(newUsers).toHaveLength(users.length)
  })

  test('user with same username is not created', async () => {
    const invalidUser = {
      username: 'test user',
      password: '12345'
    }

    const users = await helper.usersInDb

    const result = await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)

    expect(result.body.error).toContain('Username must be unique')

    const newUsers = await helper.usersInDb
    expect(newUsers).toHaveLength(users.length)
  })
})

describe('initial data of users', () => {
  test('all users returned from db', async () => {
    const result = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(result.body).toHaveLength(1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
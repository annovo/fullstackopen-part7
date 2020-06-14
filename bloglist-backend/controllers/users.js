const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { author: 1, url: 1, title: 1, id: 1 })
  response.json(users)
})

userRouter.post('/', async (request, response) => {
  const body = request.body

  if(body.password.length < 3) {
    return response.status(400).json({ error: 'Password must contain at least 3 digits' })
  }
  const saltRound = 10
  const passwordHash = await bcrypt.hash(body.password, saltRound)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  const savedUser = await user.save()
  response.json(savedUser)
})

module.exports = userRouter
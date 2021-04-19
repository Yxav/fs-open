const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  if(!username && !password) return response.status(400).json({error: "Username and password must be given"})

  if(username.length < 3 || password.length < 3) return response.status(400).json({error: "Username and password must be at least 3 characters long"})

  const user = new User({
    username: username,
    name: name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { user: 0 })

  return response.send({ users })
})

module.exports = usersRouter
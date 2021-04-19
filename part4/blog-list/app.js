const express = require('express')
const app = express()
const cors = require('cors')
require('express-async-errors')
const blogController = require('./controllers/blogs')
const usersRouter = require('./controllers/usersRouter')
const loginRouter = require('./controllers/login')

const middleware = require('./utils/middlewares')

app.use(cors())
app.use(express.json())

app.use(middleware.getTokenFrom)

app.use('/api/login', loginRouter)

app.use('/api/users', usersRouter)

app.use('/api/blogs', blogController)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
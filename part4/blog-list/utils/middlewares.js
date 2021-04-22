const User = require('../models/user')
const jwt = require('jsonwebtoken')



const getTokenFrom = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    token = JSON.parse(authorization.substring(7))
    request.token = token
    return next()
  }
  next()
}


const userExtractor = async (request, response, next) =>{
  const token = request.token
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!token || !decodedToken.id) return response.status(401).json({ error: 'token missing or invalid' })
  request.user = await User.findById(decodedToken.id)
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  }

  next(error)
}

module.exports = {
  getTokenFrom,
  unknownEndpoint,
  errorHandler,
  userExtractor
}
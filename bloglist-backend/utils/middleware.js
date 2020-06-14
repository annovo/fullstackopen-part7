const logger = require('./logger')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer ')){
    req.token = authorization.substring(7)
  }
  next()
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError'){
    if(error.message.includes('username'))
    {
      error.message = 'Username must contain at least 3 digits'
    }
    return res.status(400).json({ error: error.message })
  } else if (error.message.includes('duplicate key' && 'username')) {
    return res.status(400).json({ error: 'Username must be unique' })
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'invalid token' })
  }

  logger.error(error.message)
  next(error)
}

module.exports = {
  unknownEndpoint, errorHandler, tokenExtractor
}
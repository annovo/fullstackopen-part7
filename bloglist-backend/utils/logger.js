const morgan = require('morgan')

const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params)
  }
}

const error = (...params) => {
  console.error(...params)
}

morgan.token('models', (req) =>
  req.body.title ? JSON.stringify(req.body) : ''
)
const morganOutput = ':method :url :status :res[content-length] - :response-time ms :models'

module.exports = {
  info, error, morganOutput
}
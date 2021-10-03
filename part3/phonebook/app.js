require('dotenv').config()
var createError = require('http-errors')
var express = require('express')
var app = express()
var path = require('path')
var cookieParser = require('cookie-parser')
var morgan = require('morgan')
var mongoose = require('mongoose')
var cors = require('cors')


// var indexRouter = require('./routes/index')
var personRouter = require('./controllers/persons')
const config = require("./utils/config")
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

logger.info("connecting to", config.MONGOURI)


mongoose.connect(config.MONGOURI)
  .then(result => {
    logger.info('connected to MongoDB')
  })
  .catch(err => {
    console.error('error connecting to MongoDB:', err?.message)
  })


morgan.token('body', (req, res) => {
  return (JSON.stringify(req.body))
})
app.use(express.static('build'))
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body' ))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/persons', personRouter)

app.use(middleware.requestLogger)
app.use(middleware.errorHandler)

module.exports = app



const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const blogRouter = require('./controllers/blog')
const logger = require('./utils/logger')
const config = require('./utils/config')

logger.info('connecting to', config.MONGO_URI)

const mongoUrl = config.MONGO_URI
mongoose.connect(mongoUrl)
.then(res=>{
    logger.info("connected to mongoDB")
}).catch(err=>{
    logger.error("error connection to mongoDB", err.message)
})

// app.use(bod)
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())


app.use('/api/blog', blogRouter)

module.exports = app


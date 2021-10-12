// const http = require('http');
const express = require('express');
require('express-async-errors')
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan')

//routers
const blogRouter = require('./controllers/blog');
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const config = require('./utils/config');
const logger = require('./utils/logger');
const {errorHandler} = require('./utils/middlewares');
const middlewares = require('./utils/middlewares');

logger.info('connecting to', config.MONGO_URI);

const mongoUrl = config.MONGO_URI;
const connect = async()=> {
  try {
    const isConnected = await mongoose.connect(mongoUrl)
    if(isConnected){
      logger.info('connected to mongoDB');
    }
  } catch (err) {
    logger.error('error connection to mongoDB', err.message);
  }
}
connect()

// mongoose.connect(mongoUrl)
//   .then((res) => {
//       logger.info('connected to mongoDB');
//   }).catch((err) => {
//       logger.error('error connection to mongoDB', err.message);
//   });

// app.use(bod)
// app.use(express.json());
app.use(morgan('tiny'))
app.use(bodyParser.json());
app.use(cors());

app.use(middlewares.tokenExtractor)

app.use('/api/users', userRouter)
app.use('/api/blogs', middlewares.loggedInUser, blogRouter);
app.use('/api/login', loginRouter)


app.use(errorHandler)
module.exports = app;

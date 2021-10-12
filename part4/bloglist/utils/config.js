require('dotenv').config();

const  PORT  = process.env.PORT || 3002;
const MONGO_URI = process.env.NODE_ENV === 'test' ? process.env.MONGO_URI_TEST : process.env.MONGO_URI
const SECRETE = process.env.SECRETE

module.exports = {
  MONGO_URI,
  PORT,
  SECRETE
};

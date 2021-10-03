const http = require('http')

const config = require('./utils/config')
const app = require('./app')
const logger = require('../../part3/phonebook/utils/logger')


const server = http.createServer(app)


const PORT = config.PORT || 3003
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})
const http = require('http');
const app = require('./app');
const config = require('./utils/config');
const logger = require('../../part3/phonebook/utils/logger');

const server = http.createServer(app);

server.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`);
});

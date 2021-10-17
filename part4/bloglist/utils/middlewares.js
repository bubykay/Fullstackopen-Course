/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

const { getToken } = require('./blog_helpers');
const logger = require('./logger');
const User = require('../model/user');

const errorHandler = (error, req, res, next) => {
    logger.error(error.message);
    if (error.name === 'ValidationError') {
        return res.status(400).send({ error: error.message });
    }
    if (error.name === 'JsonWebTokenError') {
        return res.status(400).send({ error: 'invalid token' });
    }

    if (error.name === 'TokenExpiredError') {
        return res.status(400).send({ error: 'token expired' });
    }
    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformattedid' });
    }

    next(error);
};

const tokenExtractor = (req, res, next) => {
    const token = getToken(req);
    req.token = token;
    next();
};

const loggedInUser = async (req, res, next) => {
    if (req.method !== 'GET') {
        req.user = null;
        if (req.token) {
            const decodedUser = jwt.verify(req.token, process.env.SECRETE);
            if (decodedUser.id) {
                const user = await User.findById(decodedUser.id);
                req.user = { ...user, id: user._id.toString() };
            }
        } else {
            return res.status(401).send({ error: 'Authorization error' });
        }
    }
    next();
};

module.exports = {
    errorHandler,
    tokenExtractor,
    loggedInUser,
};

/* eslint-disable no-restricted-syntax */
const bcrypt = require('bcrypt');
const User = require('../model/user');

const initialUsers = require('../mockData/users');

const usersInDb = async () => {
    const response = await User.find({});
    return response.map((user) => user.toJSON());
};

const inserMany = async () => {
    for (const user of initialUsers) {
    /* eslint-disable no-await-in-loop */
        const userObj = { ...user };
        userObj.password = await bcrypt.hash(user.password, 10);
        const newUser = new User(userObj);
        await newUser.save();
    }
};

const getRandomUser = async () => {
    const users = await User.find({});
    const allUser = users.map((user) => user.toJSON());
    return allUser[Math.floor(Math.random() * allUser.length)];
};
const getRandomUserId = async () => {
    const users = await User.find({});
    const allUser = users.map((user) => user.toJSON());
    return allUser[Math.floor(Math.random() * allUser.length)].id;
};

module.exports = {
    usersInDb,
    inserMany,
    getRandomUser,
    getRandomUserId,
};

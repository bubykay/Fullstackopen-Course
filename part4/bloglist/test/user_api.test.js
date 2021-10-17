const mongoose = require('mongoose');
const supertest = require('supertest');

const User = require('../model/user');
const app = require('../app');

const api = supertest(app);
const resourceUrl = '/api/users';
const initialUsers = require('../mockData/users');
const helper = require('../utils/user_helpers');

beforeEach(async () => {
    await User.deleteMany({});
    await helper.inserMany();
}, 100000);

describe('view users in db', () => {
    test('get total numbers of users', async () => {
        const response = await api
            .get(resourceUrl)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        expect(initialUsers).toHaveLength(response.body.length);
    });
}, 100000);

describe('user creation', () => {
    test('user not created when when request username is already taken', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'gsaba8ter1',
            password: '0fofOiF',
        };
        api
            .post(resourceUrl)
            .send(newUser)
            .expect(500)
            .expect('Content-Type', /application\/json/);
        const usersAtEnd = await helper.usersInDb();
        expect(usersAtStart.length).toBe(usersAtEnd.length);
    });
}, 1000000000);

afterAll(async () => {
    mongoose.connection.close();
});

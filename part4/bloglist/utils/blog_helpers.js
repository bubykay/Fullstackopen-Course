/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const Blog = require('../model/blog');

const initialBlogs = require('../mockData/blogs');

const blogsInDB = async () => {
    const result = await Blog.find({});
    return result.map((val) => val.toJSON());
};

const hasId = async () => {
    const response = await Blog({});
    return response[0].id;
};

const deleteAll = async () => {
    await Blog.deleteMany({});
};

const insertMany = async (val) => {
    for (const blog of val) {
        const blogToSave = new Blog(blog);
        await blogToSave.save();
    }
};

const findById = async (id) => {
    const response = await Blog.findById(id);
    return response.toJSON();
};

const getToken = (request) => {
    const authorization = request.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7);
    }
    return null;
};

module.exports = {
    blogsInDB,
    hasId,
    initialBlogs,
    insertMany,
    deleteAll,
    getToken,
    findById,
};

const mongoose = require('mongoose');
const User = require('./user');

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  likes: Number,
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.password
  }
})

const Blog = mongoose.model('Blog', blogSchema);



module.exports = Blog;

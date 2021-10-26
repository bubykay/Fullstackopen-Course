const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    comment: String,
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    likes: Number,
});

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

const Comment = mongoose.model('Comment', blogSchema);

module.exports = Comment;

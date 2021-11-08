const {Schema, model}  = require('mongoose')
const  validator = require( 'mongoose-unique-validator')
const mongoose = require('mongoose')

const booksSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 2
  },
  published: {
    type: Number,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  genres: [
    { type: String}
  ]
})

booksSchema.set('toJSON', {
  transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
  },
});

booksSchema.plugin(validator)
module.exports = model('Book', booksSchema)
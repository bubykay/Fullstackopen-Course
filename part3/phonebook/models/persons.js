const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')



const phoneBookShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    unique: true
  },
  number: {
    type: String,
    minlength: 8,
    required: true
  },

})

//apply unique validator to phoneshema
phoneBookShema.plugin(uniqueValidator)

phoneBookShema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Phonebook', phoneBookShema)
const {Schema, model} = require('mongoose')
const validator = require('mongoose-unique-validator')

const authorSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  born: {
    type: Number,
  },
})

authorSchema.set('toJSON', {
  transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      returnedObject.provider = 'kayode'
      delete returnedObject._id;
      delete returnedObject.__v;
  },
});

authorSchema.plugin(validator)
module.exports = model('Author', authorSchema)
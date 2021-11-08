const {Schema, model} = require('mongoose')
const validator = require('mongoose-unique-validator')

const userSchema = new Schema({
  username: {
    type : String,
    minlength: 4

  },
  favoriteGenre: {
    type: String,
    minlength: 2
  }
})


userSchema.set('toJSON',{
  transform: (document, returedObj)=>{
    returedObj.id = returedObj._id.toString()
    delete returedObj._id
    delete returedObj.__v
  }
})
userSchema.plugin(validator)
module.exports = model('GraphQlUser', userSchema)
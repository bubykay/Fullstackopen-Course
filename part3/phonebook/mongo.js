const mongoose = require('mongoose')
const args = process.argv

const password  = args[2]
const name  = args[3]
const number = args[4]

const url = `mongodb+srv://kay:${password}@cluster0.if3fi.mongodb.net/fullStackOpen?retryWrites=true&w=majority`

if (args.length <3) {
  console.log('Please provide password, name, and, phone number')
  process.exit(1)
}

mongoose.connect(url)
const phoneBookShema = new mongoose.Schema({
  name: String,
  number: String,
})
const Phonebook = mongoose.model('Phonebook', phoneBookShema)

if(args.length===3){
  Phonebook.find({}).then(result => {
    console.log('\n')
    console.log('Phonebook:')
    result.forEach(entry => {
      console.log(entry.name, entry.number)
    })
    mongoose.connection.close()
  })
}


if(args.length > 4){
  const phoneNumber = new Phonebook({
    name,
    number
  })

  phoneNumber.save().then(result => {
    console.log('added', name, 'number', number, 'to phonebook')
    mongoose.connection.close()
  })

}



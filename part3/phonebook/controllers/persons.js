
var express = require('express')
var personRouter = express.Router()
// var mongoose = require('mongoose');


const Phonebook = require('../models/persons')

/* GET users listing. */
personRouter.get('/', function(req, res, next) {
  Phonebook.find({})
    .then(data => {
      res.json(data)
    })
    .catch(next)

})
.get('/info', (req, res)=>{
  Phonebook.find({})
  .then(response=>{
    res.send(`<p>phonebook has info for ${response.length} people </p> ${new Date()}`)
  })
})
  .get('/:id', (req,res, next) => {
    const { id } = req.params
    Phonebook.findById({ _id:id }).then(person => {
      if(person){
        res.json(person)
      }else{
        const err = new Error(`User with id ${id} not found`)
        err.statusCode = 404
        next(err)
      }})
      .catch(next)

  })
  .delete('/:id', (req, res, next) => {
    const { id } = req.params
    Phonebook.findOneAndDelete({ _id:id })
      .then(response => {
        res.status(204).json(response)
      })
      .catch(next)

  })
  .post('/', (req, res, next) => {
    const { name, number } = req.body
    //check inputs
    if(name.length && number.length){
      //if inputs are valid, check for name conflict on DB
      Phonebook.findOne({ name })
        .then(response => {
          if(response){
            // if conflict throw error
            throw new Error('duplicate Entry')
          }else{
            // if no conflict store entry to DB
            const Phonenumber = new Phonebook({ name, number })
            Phonenumber.save()
              .then(response => {
                res.status(201).json(response)
              })
            // catch error while saving to DB
              .catch(err => {
                err.status = 400
                next(err)
              })
          }
        })
      // catch name conflict error
        .catch(err => {
          err.name = 'personExist'
          err.status = 409
          next(err)
        })
    }else{
      // if inputs are not valid throw error
      const err = new Error('Invalid input')
      err.name = 'invalidInput'
      next(err)
    }
  })
  .put('/', (req, res, next) => {
    const { id, name, number } = req.body
    if(name.length && number.length){
      Phonebook.updateOne({ _id:id }, req.body)
        .then(response => {
          console.log('response from put method:', response.matchedCount)
          res.status(200).json({ ...response })
        })
        .catch(next)
    }else{
      const err = new Error('Name and Number cannot be empty')
      err.name = 'invalidInput'
      next(err)
    }
  })

module.exports = personRouter

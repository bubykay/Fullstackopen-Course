var express = require('express');
var router = express.Router();


var phonebook = require('../db/phonebook.json')

const findById = (entries, id) => {
    return entries.find(entry=>entry.id===Number(id))
}

const findByName = (entries, name)=> {
    return entries.find(entry=>(entry.name).toLocaleLowerCase() === name.toLocaleLowerCase() )
}

/* GET users listing. */
router.get('/', function(req, res, next) {

  res.send(phonebook);
})
.get('/:id', (req,res)=>{
    const {id} = req.params
    const idExist = findById(phonebook, id)
    if(!idExist){
        return res.send('invalid id')
    }
    res.send(phonebook.filter(person=>person.id===Number(id)))
    
})
.delete('/:id', (req, res)=>{
    const {id} = req.params
    const idExist = findById(phonebook, id)
    if(!idExist){
        return res.send('invalid id')
    }
    res.send(phonebook.filter(person=>person.id !== Number(id)))

})
.post('/', (req, res)=>{
    const {name, number} = req.body
    const nameExist = findByName(phonebook, name)
    if(!name || !number){
        return res.status(400).send({error:"name and number must be provided"})
    }
    if(nameExist){
        return res.status(400).send({error: "name must be unique"})
    }
    res.status(201).send({success:'Success'})
})

module.exports = router;

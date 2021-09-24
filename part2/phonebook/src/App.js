import React, { useEffect, useState } from 'react'



import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phoneService from './services/phoneService'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [filtered, setFiltered] = useState(false)
  const [filterVal, setFilterVal] = useState('')


  useEffect(()=>{
    phoneService
    .getAll()
    .then(response=>{
      setPersons(response)
    })
  },[])

  const addPerson = (event) =>{
    event.preventDefault()
    const data = {name: newName, number: newPhone}
    if(!isExist){
      phoneService
      .addToPhonebook(data)
      .then(response=>setPersons(persons.concat(response)))
    }else{
      const response = window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)
      if(response){
        const person = persons.find(person=>person.name===newName)
        const newPerson = {...data, id:person.id}
        phoneService.updatePerson(newPerson)
        .then(returnedPerson=>{
          setPersons(persons.map(person=>person.id !== returnedPerson.id?person:returnedPerson))
        })
      }
    }
    setNewName('')
    setNewPhone('')
  }

  const isExist = persons.filter(person=>(person.name).toLocaleLowerCase()===newName.toLocaleLowerCase()).length

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = event => {
    setNewPhone(event.target.value)
  }

  const handleFilter = event => {
    filterVal.length?setFiltered(true):setFiltered(false)
    setFilterVal(event.target.value)
  }

  const phoneBookToshow = filtered
                                  ?persons.filter(person=>person.name.toLocaleLowerCase().includes(filterVal.toLocaleLowerCase()))
                                  :persons

  const handleDelete = (person) =>{
    const response = window.confirm(`Delete ${person.name}?`)
    if(response){
      phoneService.deletePerson(person).then(deletedPerson=>{
        setPersons(persons.filter(newPerson=>newPerson.id !== person.id))
      })
    }
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilter} text="Filter shown with" value={filterVal} />
      <h2>add new</h2>
      <PersonForm addPerson={addPerson} handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange} newName={newName} newPhone={newPhone} />
      <h2>Numbers</h2>
      <Persons persons={phoneBookToshow} handleDelete={handleDelete} />
    </div>
  )
}

export default App;

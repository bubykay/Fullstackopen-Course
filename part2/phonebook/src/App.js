import React, { useState } from 'react'


import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [filtered, setFiltered] = useState(false)
  const [filterVal, setFilterVal] = useState('')

  const addPerson = (event) =>{
    event.preventDefault()
    isExist
    ?alert(`${newName} is already added to phonebook`)
    :setPersons(persons.concat({name: newName, number: newPhone, id:persons.length+1}))
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilter} text="Filter shown with" value={filterVal} />
      <h2>add new</h2>
      <PersonForm addPerson={addPerson} handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange} newName={newName} newPhone={newPhone} />
      <h2>Numbers</h2>
      <Persons persons={phoneBookToshow} />
    </div>
  )
}

export default App;

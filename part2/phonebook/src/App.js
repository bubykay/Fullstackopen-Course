import React, { useEffect, useState } from 'react'
import './index.css'



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
  const [notificationMessage, setNotifcationMessage] = useState(null)


  useEffect(()=>{
    phoneService
    .getAll()
    .then(response=>{
      setPersons(response)
    })
  },[])

  const notify = (message, type)=>{
    setNotifcationMessage({message, type})
          return setTimeout(()=>{
            setNotifcationMessage(null)
          },15000)
  }

  

  const addPerson = (event) =>{
    event.preventDefault()
    const personToAdd = {name: newName, number: newPhone}

    //validate fields
    if(personToAdd.name.length < 3 || personToAdd.number.length <8){
       notify("name should be 3 characters min and number 8 characters min", "error")
       return
    }
    const personExist = persons.find(person=>(person.name).toLocaleLowerCase()===(personToAdd.name).toLocaleLowerCase())
    
    //if entry exist in phonebook, update phone number
    if(personExist){
      personToAdd.id = personExist.id

      //confirm entry update
      const response = window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)
      if(response){
        phoneService
      .updatePerson(personToAdd)
      .then(response=>{
        if(response){
          setPersons(persons.map(person=>person.id !==personToAdd.id?person:personToAdd))
          notify("Entry successfully updated", 'success')
        }else{
          notify(`information of ${newName} has already been removed from server`, 'error')
        }
        setNewName("")
        setNewPhone("")
      })
      .catch(err=>{
        notify(err.message, 'error')
      })
      }
      return
    }

    phoneService
    .addToPhonebook(personToAdd)
    .then(response=>{
      if(response.id){
        setPersons(persons.concat(response))
        notify(`Entery  for ${personToAdd.name} successfully created`, "success")
        setNewName("")
        setNewPhone("")
        return
      }else{
        notify(response.message, "error")
        return
      }
    }).catch(err=>notify("Something went wrong", "error"))
  }


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

  const phoneBookToshow = filtered?persons.filter(person=>person.name.toLocaleLowerCase().includes(filterVal.toLocaleLowerCase())):persons

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
      <PersonForm addPerson={addPerson} handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange} newName={newName} newPhone={newPhone} notificationMessage={notificationMessage?.message} notificationType={notificationMessage?.type} />
      <Persons persons={phoneBookToshow} handleDelete={handleDelete} />
    </div>
  )
}

export default App;

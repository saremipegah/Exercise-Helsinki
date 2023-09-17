import React from 'react'
import { useState } from 'react'
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Persons from './components/Persons';

 const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);

  const [newName,setNewName]=useState('');
  const [newNumber,setNewNumber]=useState('');
  const [showPerson,setShowPerson]=useState('');


  const addPerson = (event) => {
   event.preventDefault()
   const nameObject = {
    name : newName,
    number: newNumber
   
   }
   const allPhonebook =  persons.map(person => person.name)
   if(allPhonebook.includes(newName)){
    alert(`${newName} is already added to phonebook`)
   
   }else{

     setPersons(persons.concat(nameObject))
     setNewName('')
     setNewNumber('')
   }

  }

  const handlePersoneChange = (event) =>{
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value)
  }
  const showhandlre = (event)=> {
    setShowPerson(event.target.value)
 }
 const filterPerson = showPerson === '' ? persons : persons.filter(person =>
  person.name.toLowerCase().includes(showPerson.toLowerCase())
  )

  
  return (
    <div>
       <h2>Phonebook</h2>
       <Filter showPerson={showPerson} showhandlre={showhandlre} />
        <h2>add a new</h2>
       <PersonForm addPerson={addPerson} 
        newName={newName} newNumber={newNumber} handlePersoneChange={handlePersoneChange}  handleNumberChange={handleNumberChange}/>
       <h2>Numbers</h2>
      <div>
       <Persons filterPerson={filterPerson} persons={persons}/>
      </div>


    </div>
  )
}



export default App
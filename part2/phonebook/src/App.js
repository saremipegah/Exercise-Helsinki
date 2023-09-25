import React from 'react'
import { useState ,useEffect } from 'react'
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Persons from './components/Persons';
import axios from 'axios'



 const App = () => {

  const [persons, setPersons] = useState([]);
  const [newName,setNewName]=useState('');
  const [newNumber,setNewNumber]=useState('');
  const [showPerson,setShowPerson]=useState('');

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
   event.preventDefault()
   const nameObject = {
    name : newName,
    number: newNumber
   
   }
   const allPhonebook =  persons.map(person => person.name)
   if(allPhonebook.includes(newName)){
    alert(`${newName} is already added to phonebook`)
   
   }

     axios
    .post('http://localhost:3001/persons',nameObject)
    .then(response => {
      console.log(response)
      setPersons(persons.concat(response.data))
      setNewName('')
      setNewNumber('')
   })

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
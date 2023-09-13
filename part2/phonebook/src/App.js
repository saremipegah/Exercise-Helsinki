import React from 'react'
import { useState } from 'react'

 const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]);

  const [newName,setNewName]=useState('');


  const addPerson = (event) => {
   event.preventDefault()
   const nameObject = {
    name : newName
   }
   setPersons(persons.concat(nameObject))
   setNewName('')
  }

  const handlePersoneChange = (event) =>{
    setNewName(event.target.value)
  }

  



  return (
    <div>
       <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <ul>
          {persons.map(person => <li key={person.name}>{person.name}</li>)}
        </ul>
      </div>


    </div>
  )
}



export default App
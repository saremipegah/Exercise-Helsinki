import React from 'react'
import { useState ,useEffect } from 'react'
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Persons from './components/Persons';
import DataPersons from './Services/DataPersons';
import Notification from './components/Notification';




 const App = () => {

  const [persons, setPersons] = useState([]);
  const [newName,setNewName]=useState('');
  const [newNumber,setNewNumber]=useState('');
  const [showPerson,setShowPerson]=useState('');
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  
  

  useEffect(() => {
    console.log('effect')
    DataPersons
      .getAll()
      .then(initialPersons=> {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')



  const addPerson = (event) => {
   event.preventDefault()

   const isDuplicateName = persons.map(person => person.name).includes(newName);
   const isDuplicateNumber = persons.map(person => person.number).includes(newNumber);

   if (!isDuplicateName && !isDuplicateNumber) {

     const nameObject = { name: newName, number: newNumber };

     DataPersons
      .create(nameObject)
      .then(returnPerson=> {
      console.log("return",returnPerson)
      setPersons(persons.concat(returnPerson))
      setSuccessMessage(`Added ${newName}`)
      setTimeout(()=>{
        setSuccessMessage(null)
      },5000)
 

})
     
   }else if (isDuplicateName && isDuplicateNumber) {
     alert(`Both the name ${newName} and number ${newNumber} are already in the phonebook`);
     setNewName('');
     setNewNumber('');
   } else if (isDuplicateName) {
     const replaceNumber = window.confirm(`${newName} is already added to the phonebook,
       replace the old number with a new one?`);
       console.log("replaceNumber",replaceNumber)

     if (replaceNumber) {
       const personToUpdate = persons.find(p => p.name === newName);
       const updatedPerson = { ...personToUpdate, number: newNumber };
        
       const key=personToUpdate.id

       console.log("id",key)
       DataPersons
       .update(personToUpdate.id, addPerson)
       .then(()=>{
        setPersons(
          persons.map(p =>(p.name === newName ? updatedPerson : p))
        );
        setSuccessMessage(`${newName}'s number changed`)
        setTimeout(()=>{
          setSuccessMessage(null)
        },5000)
       })
       .catch(error => {
        setErrorMessage(
          `Information of '${newName}' has already been removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setPersons(persons.filter(p => p.name !== newName))
      });
     }
       
     }
       
     
     
     setNewName('');
     setNewNumber('');
 
};



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

const deleteHandler = (name,id) => {
const DeletePerson= window.confirm("Delete " + name + " ?") 
 console.log(name,id)

 if (DeletePerson) {
    DataPersons
   .remove(id)
   .then(() => {
     setPersons(persons.filter((person) => person.id !== id))
     
   })
   .catch(error => {
     
   });
 
       }
  
}

  
  return (
    <div>
       <h2>Phonebook</h2>
       <Notification successMessage={successMessage} errorMessage={errorMessage}/>
       <Filter showPerson={showPerson} showhandlre={showhandlre} />
        <h2>add a new</h2>
       <PersonForm addPerson={addPerson} 
        newName={newName} newNumber={newNumber} handlePersoneChange={handlePersoneChange}  handleNumberChange={handleNumberChange}/>
       <h2>Numbers</h2>
      <div>
       <Persons filterPerson={filterPerson} persons={persons} deleteHandler={deleteHandler} />
      </div>


    </div>
  )
}



export default App
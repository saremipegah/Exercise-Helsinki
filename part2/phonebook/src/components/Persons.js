import React from 'react'

const Persons =({filterPerson , deleteHandler}) => {
  return (
    <div>
       <ul>
          {filterPerson.map(person => <li key={person.name}>{person.name}{person.number} &nbsp; <button onClick={()=>deleteHandler(person.name, person.id)}>Delete</button></li>)}
         
        </ul>
    </div>
  )
}

export default Persons


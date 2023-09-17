import React from 'react'

const PersonForm = ({newName,newNumber,addPerson,handlePersoneChange,handleNumberChange})=> {
  return (

    <>
         <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersoneChange} />
        </div>
        <br />
        <div>
         number: <input value={newNumber} onChange={handleNumberChange} />

        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      </>
  )
}

export default PersonForm
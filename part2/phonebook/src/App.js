import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleName = e => setNewName(e.target.value)

  const sendPerson = e => {
    e.preventDefault()
    const peoples = [...persons]
    peoples.push({name: newName})
    setPersons(peoples)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={sendPerson}> 
        <div>
          name: <input onChange={handleName} />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map((person,id) => <p key={id}>{person.name}</p> )}
    </div>
  )
}

export default App
import React, { useState } from 'react'


const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ filter, setfilter ] = useState('')
  

  const handleName = e => setNewName(e.target.value)

  const sendPerson = e => {
    e.preventDefault()
    const peoples = [...persons]

    setfilter(newName)

    const filtered = peoples.some(people => people.name === filter)
    if (filtered) return alert(`${newName} is already added to phonebook`)

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
      <div className="results">
        {persons.map((person,id) => <p key={id}>{person.name}</p> )}
      </div>
    </div>
  )
}

export default App
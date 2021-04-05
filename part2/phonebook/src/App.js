import React, { useState } from 'react'
import Persons from './components/Persons.js'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setfilter] = useState('')
  const [filtered, setFiltered] = useState('')


  const handleFilter = e => {
    setfilter(e.target.value)
    const peopleFiltered = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    setFiltered(peopleFiltered)
  }

  const handleName = e => setNewName(e.target.value)

  const handleNumber = e => setNewNumber(e.target.value)

  const sendPerson = e => {
    e.preventDefault()
    const peoples = [...persons]

    const filtered = peoples.some(people => people.name === newName)
    if (filtered) return alert(`${newName} is already added to phonebook`)

    peoples.push({ name: newName, number: newNumber })
    setPersons(peoples)
  }


  return (
    <div>


      <h2>Phonebook</h2>
      <div>
        filter shown with: <input onChange={handleFilter} />
      </div>

      <form onSubmit={sendPerson}>
        <div>
          name: <input onChange={handleName} />
        </div>
        <div>
          number: <input onChange={handleNumber} />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons filter={filter} filtered={filtered} persons={persons}/>
    </div>
  )
}

export default App
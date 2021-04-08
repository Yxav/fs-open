import React, { useState, useEffect } from 'react'
import Persons from './components/Persons.js'

import personsServices from './services/persons.js'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setfilter] = useState('')
  const [filtered, setFiltered] = useState('')


  useEffect(() => personsServices.getData().then(res => setPersons(res)), [])


  

  const handleFilter = e => {
    setfilter(e.target.value)
    const peopleFiltered = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    setFiltered(peopleFiltered)
  }

  const handleDelete = id => {
    const person = persons.find(person => person.id === id)
    if(window.confirm(`Delete ${person.name}?`)) {
      personsServices.deleteData(person.id)
        .then(() => {
          const updateList = persons.filter(person => person.id !== id)
          setPersons(updateList)
        })
      return
    }
  }

  const updatePerson = ({name, number}) => {
    const notification = window.confirm(`${name} is already added to phonebook. Replace the old number with a new one`)
    if(notification) {
      const person = persons.find(person => person.name === name)      
      personsServices.updateData(person.id, {name, number})
        .then(responsedPeople => setPersons(persons.map(people=> people.id !== person.id ? people : responsedPeople)))
      return
    }
    console.log('nao trocou')
  }

  const handleName = e => setNewName(e.target.value)

  const handleNumber = e => setNewNumber(e.target.value)

  const sendPerson = e => {
    e.preventDefault()
    const peoples = [...persons]
    const people = { name: newName, number: newNumber }

    const filtered = peoples.some(people => people.name === newName)
    if (filtered) return updatePerson(people)

    personsServices.saveData(people)
      .then(response => setPersons(peoples.concat(response)))


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
      <Persons filter={filter} filtered={filtered} persons={persons} handleDelete={handleDelete} />
    </div>
  )
}

export default App
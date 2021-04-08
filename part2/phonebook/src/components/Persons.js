import React from 'react'
import Person from './Person.js'


const Persons = ({ filter, filtered, persons, handleDelete }) => (

  <div>
    {filter === '' ? persons.map((person, id) => <Person key={id} person={person} handleDelete={handleDelete} />)

      : filtered.map((person, id) => <Person key={id} person={person} handleDelete={handleDelete} />)}

  </div>

)



export default Persons

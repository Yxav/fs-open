import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Countries from './components/Countries'

function App() {

  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState('')



  useEffect(() => axios.get('https://restcountries.eu/rest/v2/all')
    .then(({ data }) => {
      if (query !== "") {
        const searchCountry = data.filter(country => country.name.toLowerCase().includes(query))
        setCountries(searchCountry)
      }
    }), [query])


  const handleClick = country => setQuery(country.name.toLowerCase())

  const handleQuery = e => {
    e.persist()
    setQuery(e.target.value)
  }




  return (
    <div className="App">
      <div>
        Find Countries <input onChange={handleQuery} value={query}></input>
      </div>
      <Countries clickEvent={handleClick} countries={countries} />
    </div>
  );
}

export default App;

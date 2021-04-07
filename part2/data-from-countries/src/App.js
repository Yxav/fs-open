import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Countries from './components/Countries'

function App() {

  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState('')
  const [weather, setWeather] = useState('')



  useEffect(() => axios.get('https://restcountries.eu/rest/v2/all')
    .then(({ data }) => {
      if (query !== "") {
        const searchCountry = data.filter(country => country.name.toLowerCase().includes(query))
        setCountries(searchCountry)
      }
    }), [query])

  useEffect(() => {
    const baseUrl = 'http://api.weatherstack.com/current'
    const KEY = process.env.REACT_APP_API_KEY


    if (countries.length === 1) {

      const city = countries.map(country => country.capital)
      if (city[0]) {
        axios.get(`${baseUrl}?access_key=${KEY}&query=${city[0]}`)
          .then(({ data }) => setWeather(data))
      }
    }
  }, [countries])

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
      <Countries clickEvent={handleClick} countries={countries} weather={weather} />
    </div>
  );
}

export default App;

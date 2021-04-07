import React from 'react'
import Country from './Country'
import ShowCountry from './ShowCountry'
import WeatherCountry from './WeatherCountry'


const Countries = ({ countries, clickEvent, weather }) => {

  if (countries.length > 10) return <p>Too many matches, specify another filter</p>

  else if (countries.length > 1 && countries.length < 10) return countries.map(country => <Country key={country.name} clickEvent={clickEvent} country={country} />)

  else if (countries.length === 1) {
    return (
      <div>
          { countries.map(country => <ShowCountry key={country.name} country={country} />)}
          <WeatherCountry weather={weather}/>
        </div>
      )
  }
  else {
    return <p>Please, insert a country name</p>
  }
}

export default Countries



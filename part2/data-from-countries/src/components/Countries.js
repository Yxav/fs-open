import React from 'react'
import Country from './Country'
import ShowCountry from './ShowCountry'


const Countries = ({countries, clickEvent}) => {
  
  if(countries.length > 10) return <p>Too many matches, specify another filter</p>
  
  else if(countries.length > 1 && countries.length < 10) return countries.map(country => <Country key ={country.name} clickEvent={clickEvent} country={country}/>) 

  else if(countries.length === 1) return countries.map(country => <ShowCountry key ={country.name} country={country}/>)
  else {
    return <p>Please, insert a country name</p>
  }
}

export default Countries



import React from 'react'

const ShowCountry = ({country}) => {
  return (
    <div>
      <h3>{country.name}</h3>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>

      <ul> Spoken Languages:
        {country.languages.map(language => <li>{language.name}</li>)}
      </ul>

      <img src={country.flag} width={300} height={150} />
  
    </div>
  )
}

export default ShowCountry


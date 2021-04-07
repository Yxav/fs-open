import React from 'react'

const Country = ({ country, clickEvent}) => {

  return (
    <div>
      <span>{country.name} </span>
      <span><button onClick={()=>clickEvent(country)}>Show</button></span><br />
    </div>
  )
}

export default Country


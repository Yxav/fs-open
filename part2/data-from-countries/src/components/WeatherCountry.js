import React from 'react'

const Weather = ({ weather }) => {
  return (
    <div>
      <h3>Weather in {weather.location.country}</h3>
      <p><b>temperature:</b> {weather.current.temperature}</p>

      <img src={weather.current.weather_icons[0]} width={150} height={150} />

      <p><b>wind:</b> {weather.current.wind_speed} mph direction {weather.current.wind_dir} </p>
  
    </div>
  )
}

export default Weather


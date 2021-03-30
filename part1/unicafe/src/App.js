import React, { useState } from 'react'


const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>
}

const Display = (props) => {
  return <p>{props.text} {props.value}</p>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>Give feedback</h2>
      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />
      <h2>Statistics</h2>
      <Display value={good} text="Good" />
      <Display value={neutral} text="Neutral" />
      <Display value={bad} text="Bad" />


    </div>
  )
}

export default App
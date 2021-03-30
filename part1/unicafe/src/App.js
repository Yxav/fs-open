import React, { useState } from 'react'


const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>
}

const Display = (props) => {
  return <p>{props.text} {props.value}</p>
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
    setTotal(total + 1)
  }  

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }  
  
  const handleBad = () => {
    setBad(bad + 1)
    setTotal(total + 1)
  }




  return (
    <div>
      <h2>Give feedback</h2>
      <Button handleClick={handleGood} text="Good" />
      <Button handleClick={handleNeutral} text="Neutral" />
      <Button handleClick={handleBad} text="Bad" />
      <h2>Statistics</h2>
      <Display value={good} text="good" />
      <Display value={neutral} text="neutral" />
      <Display value={bad} text="bad" />
      <Display value={total} text="total" />
      <Display value={(good * 1 + neutral * 0 + bad * -1)/total} text="average" />
      <Display value={good/total + " %"} text="positive" />


    </div>
  )
}

export default App
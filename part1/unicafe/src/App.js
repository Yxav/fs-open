import React, { useState } from 'react'


const Button = props => {
  return <button onClick={props.handleClick}>{props.text}</button>
}

const Statitic = props => {
  return <p>{props.text} {props.value}</p>
}

const Statistics = ({good, neutral, bad}) => {
  let total = good + neutral + bad
  if(total===0) return <div>No feedback given</div>

  return (
    <div>
      <Statitic value={good} text="good" />
      <Statitic value={neutral} text="neutral" />
      <Statitic value={bad} text="bad" />
      <Statitic value={total} text="total" />
      <Statitic value={(good * 1 + neutral * 0 + bad * -1) / total} text="average" />
      <Statitic value={good / total + " %"} text="positive" />
    </div>
  )

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
      <Statistics good={good} neutral={neutral} bad={bad} />



    </div>
  )
}

export default App
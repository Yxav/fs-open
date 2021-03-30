import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0)

  const initialPoints = Array(6).fill(0)
  const [vote, setVote] = useState(initialPoints)
  console.log(vote)

  const votes = () =>{
    const copy = [...vote]
    copy[selected] += 1
    setVote(copy)
  }

  return (
    <div>
      <div>
      {anecdotes[selected]}
      </div>
      <button onClick={()=>setSelected(selected + 1)}>next anecdote</button>
      <button onClick={votes}>vote</button>
    </div>
  )
}

export default App
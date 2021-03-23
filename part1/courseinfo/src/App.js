import React from 'react'

const App = () => {

  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of component'
  const exercises3 = 14
  


  const Header = (props) => {
    return (
      <div>
        <p>{props.course}</p>
      </div>
    )
  }

  const Content = () => {
    return (
      <div>
        <p>{part1} {exercises1}</p>
        <p>{part2} {exercises2}</p>
        <p>{part3} {exercises3}</p>
      </div>
    )
  }

  const Total = () => {
    return (
      <div>
        <p>{exercises1 + exercises2 + exercises3 }</p>
      </div>
    )
  }

  return (
  <div>
    <Header course={course} />
    <Content />
    <Total />
  </div>
  )

}

export default App
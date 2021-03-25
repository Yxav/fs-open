import React from 'react'

const App = () => {

  const course = 'Half Stack application development'

  
  const part1 ={
    name: 'Fundamentals of React',
    exercises: 10
  } 
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 ={
    name: 'State of component',
    exercises: 14
  } 
  


  const Header = (props) => {
    return (
      <div>
        <p>{props.course}</p>
      </div>
    )
  }

  const Part = (props) => {
    console.log(props)
    return (
      <div>
        <p>{props.part.name} {props.part.exercise}</p>
      </div>
    )
  }

  const Content = () => {
    return (
      <div>
        <Part part={part1} />
        <Part part={part2} />
        <Part part={part3} />
      </div>
    )
  }

  const Total = () => {
    return (
      <div>
        <p>{part1.exercises + part2.exercises + part3.exercises }</p>
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
import React from 'react'

const App = () => {

  const course = 'Half Stack application development'

  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  const Header = (props) => {
    return (
      <div>
        <p>{props.course}</p>
      </div>
    )
  }

  const Content = (props) => {
    const { parts } = props
    const listParts = parts.map((part,index) => <p key={index}>{part.name} {part.exercises}</p>)

    return (
      <div>
        <div>
          {listParts}
        </div>
      </div>
    )
  }


  const Total = (props) => {
    const { parts } = props
    let total = 0
    for (const partTotal of parts) {
      total += partTotal.exercises
    }
    return (
      <div>
        <p>Total exercises {total}</p>
      </div>
    )
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts}/>
    </div>
  )

}

export default App
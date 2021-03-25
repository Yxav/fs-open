import React from 'react'

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }
  const Header = (props) => {
    const { course } = props
    return (
      <div>
        <p>{course.name}</p>
      </div>
    )
  }

  const Content = (props) => {
    const { course } = props
    const listParts = course.parts.map((part,index) => <p key={index}>{part.name} {part.exercises}</p>)

    return (
      <div>
        <div>
          {listParts}
        </div>
      </div>
    )
  }


  const Total = (props) => {
    const { course } = props
    let total = 0
    for (const partTotal of course.parts) {
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
      <Content course={course} />
      <Total course={course}/> 
    </div>
  )

}

export default App
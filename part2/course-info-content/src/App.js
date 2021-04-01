
const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  const Course = ({ course }) => {

    const Header = ({ name }) => <p>{course.name}</p>

    const Content = ({ content }) => content.map((part,id)=> <Part key={id} name={part.name} exercises={part.exercises}/>)

    const Part = ({name, exercises}) => <p>{name} {exercises}</p>

    const Total = ({exercises}) =><p><b>Total of exercises {exercises.reduce((acc, current )=> acc+current.exercises, 0)}</b></p>

    return (
      <div>
        <Header name={course.name} />
        <Content content={course.parts} />
        <Total exercises={course.parts}/>
      </div>
    )
  }

  return <Course course={course} />
}

export default App
const Course = ({ course }) => {

  const Header = ({ name }) => <h2>{course.name}</h2>

  const Content = ({ content }) => content.map((part,id)=> <Part key={id} name={part.name} exercises={part.exercises}/>)

  const Part = ({name, exercises}) => <p>{name} {exercises}</p>

  const Total = ({exercises}) =><h3><b>Total of exercises {exercises.reduce((acc, current )=> acc+current.exercises, 0)}</b></h3>

  return (
    <div>
      <h1>Web Development Curriculum</h1>
      <Header name={course.name} />
      <Content content={course.parts} />
      <Total exercises={course.parts}/>
    </div>
  )
}

export default Course
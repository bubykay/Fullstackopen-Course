import React from 'react'
const Header = (props) => {
  return(
    <>
      <h1>{props.course.name}</h1>
    </>
  )
}


const Content = (props) => {
  return (
    <>
      {props.course.parts.map((part, id)=>(
        <p key={id}>{part.name} {part.exercises} </p>
      ))}
    </>
  )
}

const Total = (props) => {
  let totalExercises = 0
  props.course.parts.forEach(element => {
    totalExercises += element.exercises
  });
  return(
    <>
      <p>Number of exercises {totalExercises}</p>
    </>
  )
}


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
 
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course}/>
    </div>
  )
}

export default App;

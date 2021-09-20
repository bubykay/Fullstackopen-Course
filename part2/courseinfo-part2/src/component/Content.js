import React from 'react';


import Header from './Header';
import Part from './Part';
const Content = ({course}) => {
    const exercises = []
    course.parts.forEach(part=>exercises.push(part.exercises))
    const total = exercises.reduce((a,b)=>a+b)

    
    return (
        <>
            <Header header={course.name} />
            {course.parts.map(part=>(
              <Part part={part} key={part.id} />  
            ))}
            <h4>Total of {total} exercises </h4>
        </>
    );
};

export default Content;
import React from 'react';


import Content from './Content';

const Course = ({courses}) => {
    return (
        <>
        {courses.map(course=>(
            <Content course={course} key={course.id} />
        ))}
        </>
    );
};

export default Course;
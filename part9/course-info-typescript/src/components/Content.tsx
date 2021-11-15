import React from 'react';
// import CourseDetails from './CourseDetails';
import { CoursePartProps} from '../types'
import CourseDetails from './CourseDetails';


const Content: React.FC<CoursePartProps> = ({courseParts}) => {
 return(
   <div>
     { courseParts.map((part, i)=>(
    <CourseDetails part={part} key={i}/>
  ))}
   </div>
 )
};

export default Content;
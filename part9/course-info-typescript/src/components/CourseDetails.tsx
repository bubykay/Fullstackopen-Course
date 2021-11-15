import React from 'react';
import { PartDetail } from '../types';


const CourseDetails: React.FC<PartDetail> = ({part}) => {
  switch (part.type) {
    case 'normal':
      return (
        <div>
          <h2>{part.name} {part.exerciseCount}</h2>
          {part.description}
        </div>
      )
      case 'groupProject':
        return (
          <div>
            <h2>{part.name} {part.exerciseCount}</h2>
            <div>
              Project excercises {part.groupProjectCount}
            </div>
          </div>
        )
      case 'submission':
        return (
          <div>
            <h2>{part.name} {part.exerciseCount}</h2>
            <div>
              {part.description}
            </div>
            <div>
              {part.exerciseSubmissionLink}
            </div>
          </div>
        )
    default:
      return null;
  }
};

export default CourseDetails;
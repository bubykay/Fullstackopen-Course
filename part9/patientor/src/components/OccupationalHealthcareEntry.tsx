import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Entry } from '../types';

const OccupationalHealthcareEntry = ({entry}:{entry:Entry}) => {
  return (
    <div style={{
      border:'10px', 
      borderColor:'red', 
      backgroundColor:'beige', 
      paddingRight:'10px', 
      paddingTop: '5px',
      paddingBottom: '5px',
      paddingLeft:'10px',
      marginBottom:'5px'
      }}>
        <h2>{entry.date} <Icon name='stethoscope' /> {entry.specialist}</h2>
      <div>
      {entry.description}
      </div>
    </div>
  );
};

export default OccupationalHealthcareEntry;
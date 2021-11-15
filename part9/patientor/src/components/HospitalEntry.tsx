import React from 'react';
import { Entry } from '../types';

const HospitalEntry = ({entry}:{entry:Entry}) => {
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
      Hospital Entry
      <div>
      {entry.description}
      </div>
      
    </div>
  );
};

export default HospitalEntry;
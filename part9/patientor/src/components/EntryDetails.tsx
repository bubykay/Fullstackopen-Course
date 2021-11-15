import React from 'react';
import {Entry} from '../types';
import HeathCheckEntry from './HeathCheckEntry';
import HospitalEntry from './HospitalEntry';
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry';

const EntryDetails:React.FC<{entry:Entry}> = ({entry}:{entry:Entry}) => {
    switch (entry.type) {
      case "HealthCheck": 
        return <HeathCheckEntry entry={entry} />;
      case "Hospital":
        
        return <HospitalEntry entry={entry} />;
      case "OccupationalHealthcare":
        return <OccupationalHealthcareEntry entry={entry} />;
      default:
        return null;
    }

};

export default EntryDetails;
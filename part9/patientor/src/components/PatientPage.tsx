

import React, { useEffect, useState }  from 'react';
import { useParams } from 'react-router';
import { Icon } from 'semantic-ui-react';
import { useStateValue } from '../state';
import { Patient } from '../types';
import EntryDetails from './EntryDetails';


const PatientPage = () => {
  const [{patients}] = useStateValue();
  const [patient, setPatient] = useState<Patient>();
  const {id} = useParams<{id: string}>();
  


    useEffect(()=>{
      const setPatientState = () => {
        setPatient(patients[id]);
      };
      void setPatientState();
    });
  

  let genderType: 'female' | 'male' | undefined | 'genderless';
  if(patient && id){
    // console.log(patient);
    switch (patient.gender) {
      case 'male': 
      genderType = 'male';
       break;
      case 'female':
        genderType = 'female';
        break;
      case 'other':
        genderType = 'genderless';
        break;
      default:
        genderType = 'genderless';
    }
    
    
    return (
      <div>
        <h2>{patient.name} <Icon name={genderType} /> </h2>
        <div>ssn: {patient.ssn}</div>
        <div>Occupation: {patient.occupation}</div>
        <div>
          <h2>Entries</h2>
          {patient.entries.map((entry, index)=>(
            <EntryDetails entry={entry} key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>Patient loading</div>
  );
};

export default PatientPage;
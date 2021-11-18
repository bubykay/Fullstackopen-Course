

import React, { useEffect, useState }  from 'react';
import { useParams } from 'react-router';
import { Button, Icon } from 'semantic-ui-react';
import { useStateValue } from '../state';
import { Patient } from '../types';
import EntryDetails from '../components/EntryDetails';
import AddEntryModal from '../AddEntryModal';


const PatientPage = () => {
  const [{patients}] = useStateValue();
  const [patient, setPatient] = useState<Patient>();
  const {id} = useParams<{id: string}>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  


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

    const closeModal = ():void => {
      setModalOpen(false);
    };
    
    
    return (
      <div>
        <h2>{patient.name} <Icon name={genderType} /> </h2>
        <div>ssn: {patient.ssn}</div>
        <div>Occupation: {patient.occupation}</div>
        <div>
          <h2>Entries </h2> 
          {patient.entries.map((entry, index)=>(
            <EntryDetails entry={entry} key={index} />
          ))}
        </div>
        <Button onClick={()=>setModalOpen(true)}>Add Entry</Button>
        <AddEntryModal 
        name={patient.name} 
        modalOpen={modalOpen} 
        onClose={closeModal} 
        onSubmit={()=>console.log('form submited')}
        />
      </div>
    );
  }

  return (
    <div>Patient loading</div>
  );
};

export default PatientPage;
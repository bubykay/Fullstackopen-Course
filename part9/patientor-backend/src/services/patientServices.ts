import patients from '../data/patients';
import {v1 as uuid} from 'uuid';
import { PublicPatient, Patient, NewPersonEntry, HealthCheckRating} from '../types/index';


const arrPatient: Patient [] = patients;

export const getPublicPatient = (): PublicPatient [] =>{

  return arrPatient.map(({id, name, dateOfBirth, gender, occupation, entries}) =>({
      name,
      gender,
      occupation,
      dateOfBirth,
      id,
      entries
  }));
};

export const getPatients = (): Patient [] => {
  return arrPatient;
};

export const addNewPatient = (object: NewPersonEntry): Patient => {

  const addedPatient =  {
    id: uuid(),
    entries: [],
    ...object
  };
  arrPatient.push(addedPatient);
  return addedPatient;
};

// utitliy function for retriving patients by Id from state
export const getPatientById = (id:string) : Patient  => {
  const obj = arrPatient.find(p=>p.id===id)
  if(!obj){
    throw new Error("Patient with the id: " + id +" does not exist");
  }
  return obj
}

export const insertUpdatedPatient=(id: string, obj:Patient): void => {
  arrPatient.map(entry=>entry.id===id?obj:entry)
}





const isString = (text: unknown) => {
  return typeof text === 'string' || text instanceof String
}



export const parseType = (type: unknown): void => {
  const validType :string[]= ['OccupationalHealthcare','HealthCheck' ,'Hospital']
  if(!validType.includes(type as string) || !isString (type)){
    throw new Error(`invalid type. type can only be either ${validType.join(' or ')}`)
  }
}

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const parseDate = (date: string): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date as string;
};

export const parseDescription = (description: unknown): string => {
  if(!description || !isString(description)){
    throw new Error ('Incorrect or missing description: ' + description)
  }
  return description as string
}


const arrayIsString = (arr:unknown[]) => {
  const result:boolean[] = []
  arr.map(member=>{
    result.push(typeof member === 'string')
  })
  if(result.includes(false)){
    throw new Error('Diagnosis Codes can only contain string')
  }
  return true
}

export  const parseDiagnosisCodes = (diagnosis: unknown): string[] =>{
  if(!Array.isArray(diagnosis) || !arrayIsString(diagnosis)){
    throw new Error('Incorrect or invalid diagnosis, array of text expected')
  }
  return diagnosis
}
export  const parseSpecialist = (specialist: unknown): string => {
  if(!specialist || !isString(specialist)){
    throw new Error("incorrect or invalid specialist: " + specialist)
  }
  return specialist as string
}

export  const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckEntry = (param:any):param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param)

}

export const parseHealthCheckRating = (healthCheckRating:unknown): HealthCheckRating => {
  if(!healthCheckRating || !isHealthCheckEntry(healthCheckRating)){
    throw new Error("Incorrect or invalid healthcheck rating: "+ healthCheckRating)
  }
  return healthCheckRating
}

interface SickLeave {
  startDate: string
  endDate: string
}

interface Discharge {
  date: string
  criteria: string
}

export const parseSickLeave = (obj: any):SickLeave => {
  if(!obj.startDate || !obj.endDate || !isDate(obj.startDate) || !isDate(obj.endDate)){
    throw new Error('Incorrect startDate or endDate: '+ obj)
  }
  return obj
}

export const parseDischarge = (obj: any): Discharge => {
  if(!obj.date || !obj.criteria || !isString(obj.criteria) || !isDate(obj.date)){
    throw new Error('Incorrect or missing date or citeria in discharge : ' + obj)
  }
  return obj
}

// import patients from '../data/patients.json'
export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  occupation: string;
  gender: Gender,
  entries: Entry[]
}

export interface Diagnosis {
  code : string
  name: string
  latin?: string
}

export interface BaseEntry {
  id: string
  date: string
  type: string
  specialist: string
  description: string
  diagnosisCodes?: Diagnosis['code'][]
}

interface Discharge {
  date: string
  criteria: string
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry{
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry{
  type: 'OccupationalHealthcare'
  employerName : string
  sickLeave?: {
    startDate: string
    endDate: string
  }
}

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital'
  discharge: Discharge
}

export type Entry = | HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry





export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;

export type NewPersonEntry = Omit<Patient,  'id' | 'entries'>;


export type Fields = {name: unknown, gender: unknown, occupation: unknown, ssn: unknown, dateOfBirth: unknown, entries: unknown};


type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
export type NewEntry = UnionOmit<Entry, 'id' >
export type NewBaseEntry = Omit<BaseEntry, 'id'>


export interface EntryFields {
  date: unknown
  description: unknown,
  specialist: unknown,
  diagnosisCodes: unknown
  type: unknown,
  employerName: unknown
}






import { Gender, Fields, NewPersonEntry} from '../types';


const isString=(str:unknown) : str is string=>{
  return typeof str === 'string' || str instanceof String;
};

const parseString = (gender: unknown): string => {
  if(!gender || !isString(gender)) throw new Error("gender should be a string");
  return gender;

};

const isDate = (date: string):  boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing weather: ' + gender);
  }
  return gender;
};


export const parsePatientEntry = ({name, gender, occupation, ssn, dateOfBirth, entries}: Fields) : NewPersonEntry =>{
 const newENtry = {
   name: parseString(name),
   gender: parseGender(gender),
   occupation: parseString(occupation),
   ssn: parseString(ssn),
   dateOfBirth: parseDate(dateOfBirth), 
   entries
 };
 return newENtry;
};



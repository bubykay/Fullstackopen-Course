import express from 'express';
import {v1 as uuid} from 'uuid'

import {
  addNewPatient,
  getPatientById,
  getPublicPatient,
  insertUpdatedPatient,
  // newEntry,
  parseDate,
  parseDescription,
  parseDiagnosisCodes,
  parseDischarge,
  parseHealthCheckRating,
  parseSickLeave,
  // parseHealthCheckRating,
  parseSpecialist,
  // parseType
} from '../services/patientServices';
import {  Fields, NewEntry} from '../types';
import { parsePatientEntry } from '../utils';
const patientRouter = express.Router();


patientRouter
.get('/', (_req, res)=>{
  const data = getPublicPatient();
  res.status(200).send(data);
})

.get('/:id', (req, res)=>{
  const {id} = req.params
  const data = getPublicPatient().find(patient=>patient.id === id)
  res.send(data)

})

//@typescript-eslint/no-unsafe-argument
.post('/', (req, res)=>{
  const obj = req.body as Fields;
  const patientToAdd = parsePatientEntry(obj);
  const added = addNewPatient(patientToAdd);
  res.send(added);

})



.post('/:id/entries', (req, res)=>{
  const {id:patientId} = req.params
  const body:NewEntry = req.body
  try {
    const patientObj = getPatientById(patientId)
    const commonEntryFields = {
      date : parseDate(body.date),
      description: parseDescription(body.description),
      diagnosisCodes: parseDiagnosisCodes(body.diagnosisCodes),
      specialist: parseSpecialist(body.specialist),
    }
    switch (body.type) {
      case "HealthCheck":
          let obj = {
            ...commonEntryFields,
            healthCheckRating: parseHealthCheckRating(body.healthCheckRating)
          }
          patientObj?.entries.push({...obj, id:uuid(), type:'HealthCheck'})
          insertUpdatedPatient(patientId, patientObj)
          res.status(200).send(patientObj)
        return;
        case "Hospital":
           const hospObj = {
            ...commonEntryFields,
            discharge: parseDischarge(body.discharge)
          }
          patientObj.entries.push({...hospObj, id: uuid(), type:"Hospital"})
          insertUpdatedPatient(patientId, patientObj)
          res.status(200).send(hospObj)
        return;
        case "OccupationalHealthcare":
          const occObj ={
            ...commonEntryFields,
            sickLeave: parseSickLeave(body.sickLeave),
            employerName: body.employerName
          }
          patientObj.entries.push({...occObj, id:uuid(), type:"OccupationalHealthcare"})
          res.status(200).send(occObj)
        return;
      default:
        res.send({error: 'Invalid or missing type. Type is either OccupationalHealthcare, Hospital or HealthCheck'});
    }
  } catch ({message}) {
    res.status(400).send({error:message})
  }
});





export default patientRouter;
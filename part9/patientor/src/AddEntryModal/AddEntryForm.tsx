import { Formik, Form, Field } from 'formik';
import {Grid, Button, Form as SemantiForm} from 'semantic-ui-react';
import React from 'react';
import { DiagnosisSelection,NumberField, TextField , TypeOption ,TypeSelectField} from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { Types } from '../types';

interface props {
  onSubmit: ()=>void
  onCancel: ()=>void
}

const AddEntryForm = ({onCancel}:props) => {
  const [state] = useStateValue();
  const code = Object.values(state.diagnosis);
    
  const typeOptions:TypeOption[] =  [
    { value: '' ,label: "Select Type" },
    { value: Types.HealthCheck ,label: "Health Check" },
    { value: Types.Hospital, label: "Hospital" },
    { value: Types.OccupationalHealthcare, label: "Occupation Health Care" }
  ];

  
 
  return (
    <Formik 
    initialValues={{
      type:'',
      description: '',
      diagnosisCodes : [],
      healthCheckRating: '',
      discharge: {
        date:'',
        criteria:''
      },
      sickLeave : {
        startDate: '',
        endDate: ''
      }, 
      employerName: '',
      date: '',
      specialist: ''


    }}
   

    onSubmit={(values)=>console.log(values)}
    validate  ={values=>{
      const requiredError = 'Field is required';
      const errors:{[field:string]:string} = {};
      if(!values.date){
        errors.date = requiredError;
      }
      if(!values.description){
        errors.description = requiredError;
      }
      if(!values.diagnosisCodes.length){
        errors.diagnosisCodes = requiredError;
      }
      if(!values.specialist){
        errors.specialist = requiredError;
      }
      if(!values.type){
        errors.type = requiredError;
      }

      switch (values.type) {
        case "HealthCheck":
          if(!values.healthCheckRating){
            errors.healthCheckRating = requiredError;
          }
          break;
        case "Hospital":
          
          if(!values.discharge.criteria){
            errors.discharge = requiredError;
          }
          if(!values.discharge.date){
            errors.discharge = requiredError;
          }
          break;
        case "OccupationalHealthcare":
          if(values.employerName){
            errors.employerName = requiredError;
          }
          if(values.sickLeave.endDate){
            errors.sickLeave = requiredError;
          }
          if(values.sickLeave.startDate){
            errors.sickLeave = requiredError;
          }
          break;
        default:
          break;
      }
      return errors;


    }}
    >
      {
        ({dirty, isValid, setFieldValue, setFieldTouched, values})=>{
          return (
            <Form className='form ui'>

              <Field 
                label='Specialist'
                name='specialist'
                placeholder= 'Specialist'
                component={TextField} 
               />

               <Field 
               label = 'Description'
               name= 'description'
               placeholder = 'Description'
               component= {TextField}
               />

               <Field 
                component={DiagnosisSelection}
                name = 'diagnosisCodes'
                diagnoses= {code}
                setFieldValue = {(e:string, data:string[])=>setFieldValue('diagnosisCodes', data)}
                setFieldTouched = {()=>setFieldTouched('diagnosisCodes', false)}
               
                />

                <Field 
                  name = 'date'
                  label = 'Date'
                  placeholder = 'YYYY-MM-DD'
                  component = {TextField}
                />

                <TypeSelectField 
                options = {typeOptions}
                name = 'type'
                label = 'Entry type'
                />

                

                {values.type === 'OccupationalHealthcare' && (
                  <SemantiForm.Field>
                    <Field
                    name = 'employerName'
                    label = 'Employer Name'
                    placeholder = 'Employer Name'
                    component = {TextField}
                  />
                    <Field
                    name = 'sickLeave.startDate'
                    label = 'Leave Start Date'
                    placeholder = 'YYYY-MM-DD'
                    component = {TextField}
                  />
                    <Field
                    name = 'sickLeave.endDate'
                    label = 'Leave End Date'
                    placeholder = 'YYYY-MM-DD'
                    component = {TextField}
                  />
                  </SemantiForm.Field>
                  
                )}
                {values.type === 'HealthCheck' && (
                  
                  <Field
                    label="Health Check Rating"
                    name="healthCheckRating"
                    component={NumberField}
                    min={0}
                    max={3}
                  />
                )}
                {values.type === 'Hospital' && (
                  <SemantiForm.Field>
                    <Field
                    name = 'discharge.date'
                    label = 'Date Discharged'
                    placeholder = 'YYYY-MM-DD'
                    component = {TextField}
                  />
                  <Field 
                    name = 'discharge.criteria'
                    label = 'Discharge Criteria'
                    placeholder = 'Discharge Criteria'
                    component = {TextField}
                  />
                  </SemantiForm.Field>
                )}

          <Grid>
            <Grid.Column floated="left" width={5}>
              <Button type="button" onClick={onCancel} color="red">
                Cancel
              </Button>
            </Grid.Column>
            <Grid.Column floated="right" width={5}>
              <Button
                type="submit"
                floated="right"
                color="green"
                disabled={!dirty || !isValid}
              >
                Add
              </Button>
            </Grid.Column>
          </Grid>
            </Form>
          );
        }
      }

    </Formik>
    
  );
};

export default AddEntryForm;
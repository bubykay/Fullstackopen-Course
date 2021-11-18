import { State } from "./state";
import { Diagnosis, Patient } from "../types";
// import { Dispatch } from "react";
// import { useStateValue } from ".";

// const [,dispatch] = useStateValue();

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
    type: 'SET_DIAGNOSIS_LIST';
    payload: Diagnosis[]
  }
  | {
    type: 'SET_ERROR';
    payload: string;
    }
  | {
    type: 'CLEAR_ERROR';
    payload: string;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnosis
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };

      case "SET_ERROR":
        return {
          ...state,
          error: action.payload
        };

      case "CLEAR_ERROR":
        return {
          ...state,
          error: ''
        };

    default:
      return state;
  }
};


export const setPatientList = (data:Patient[]):Action => ({type:"SET_PATIENT_LIST", payload:data});
export const setDiagnosisList = (data:Diagnosis[]):Action => ({type:"SET_DIAGNOSIS_LIST", payload:data});
export const setErrorMessage = (message:string):Action => ({type:"SET_ERROR", payload:message});
export const clearErrorMessage =():Action => ({type:"CLEAR_ERROR", payload:''});

// export const setAndClearError = (message:string)=> {
//   return async dispatch =>{
//       dispatch(setErrorMessage(message))
//     setTimeout(() => {
//       dispatch(clearErrorMessage())
//     }, 5000);
//   }
  
// }

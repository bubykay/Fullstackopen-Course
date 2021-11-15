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
          ...state.patients
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
    default:
      return state;
  }
};


export const setPatientList = (data:Patient[]):Action => ({type:"SET_PATIENT_LIST", payload:data});
export const setDiagnosisList = (data:Diagnosis[]):Action => ({type:"SET_DIAGNOSIS_LIST", payload:data});

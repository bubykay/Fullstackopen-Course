import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue , setPatientList, setDiagnosisList} from "./state";
import { Diagnosis, Patient } from "./types";

import PatientListPage from "./PatientListPage";
import PatientPage from "./components/PatientPage";

const App = () => {
  const [,dispatch] = useStateValue();
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);
        const { data: diagnosisListFromApi } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnosis`);
        dispatch(setPatientList(patientListFromApi));
        dispatch(setDiagnosisList(diagnosisListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route exact path="/">
              <PatientListPage />
            </Route>
            <Route exact path="/patient/:id">
              <PatientPage />
            </Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
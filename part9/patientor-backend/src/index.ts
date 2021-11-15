import express from 'express';
import {createServer} from 'http';
import  cors from 'cors';

import indexRouter from './routes/indexRouter';
import patientRouter from './routes/patientRouter';
import diagnosisRouter from './routes/diagnosisRouter';

const app = express();
app.use(express.json());
app.use(cors());


// app.get('/ping', (_req, res)=>{
//   res.send('pong')
// })

app.use('/api/', indexRouter);
app.use('/api/patients/', patientRouter);
app.use('/api/diagnosis/',diagnosisRouter);

const server = createServer(app);
const PORT = process.env.PORT || 3001;
server.listen(PORT, ()=>{
  console.log(`server running on ${PORT}`);
});

import express from 'express';
import {createServer} from 'http';
import consola from 'consola';

import {bmiCategory} from '../calculateBmi';

const app = express();

app.get('/', (_req, res)=>{
  res.send('I am here');
});
app.get('/bmi', (req, res)=>{
  const {height, weight} = req.query;
  if(!height || !weight) {
    res.status(401).send({error:'malformatted parameters'});
    return;
  }
  const bmi = bmiCategory( Number(weight)/(Number(height) * Number(height)) * 10000);
  res.status(200).send({height, weight, bmi});
});

app.post('/exercises', (req, res)=>{
  const {daily_exercises, target}:{daily_exercises:[number], target:number} = req.body;
  if(!daily_exercises || !target){
    res.status(400).send({error: 'malformed parameters'});
    return;
  }
});

const server = createServer(app);
const PORT = process.env.PORT || 3001;
server.listen(PORT, ()=>{
consola.success({message: `server listening on port ${PORT}`, badge:true});
});
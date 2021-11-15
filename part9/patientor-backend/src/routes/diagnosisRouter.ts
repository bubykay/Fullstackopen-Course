import diagnosis from '../data/diagnosis';

import express from 'express';

const diagnosisRouter = express.Router();


diagnosisRouter
.get('/', (_req, res)=>{
  res.send(diagnosis);
});

export default diagnosisRouter;
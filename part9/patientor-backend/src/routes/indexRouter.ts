import express from 'express';

const indexRouter = express.Router();

indexRouter
.get('/ping', (_req, res)=>{
  res.send('pong');
});

export default indexRouter;
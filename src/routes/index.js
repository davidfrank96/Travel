import express from 'express';
import apiRouter from './api';

const index = express.Router();

index.use('/api', apiRouter);

export default index;

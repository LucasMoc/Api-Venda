import 'reflect-metadata';
import 'dotenv/config'
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { errors } from 'celebrate';
import cors from 'cors';
import routes from './routes'
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';
import uploadConfig from '@config/upload'

const app = express();

app.use(cors());
app.use(express.json());

app.use('/files', express.static(uploadConfig.directory));

app.use(routes);

app.use(errors());

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ status: 'error', message: error.message, })
  };

  return response.status(500).json({ status: 'error', message: 'Internal server error' })

})

app.listen(process.env.APP_PORT, () => {
  console.log('server start on port 3333');
});
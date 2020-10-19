import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import axios from 'axios';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import loop from '../../../bora/loop';

import routes from './routes';

import rateLimiter from './middlewares/rateLimiter';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(rateLimiter);
app.use(routes);

app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('😁👌 Server started on port 3333 😁👌');
});

axios
  .post(
    'http://server.bora-iot.com/device/secret/b21dcc851757c70dc42f825c95f8970410926a73a8b5aeb14e92c4f23aab25f0/data/variavel?value=1',
  )
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
// await setInterval(loop, 1000);

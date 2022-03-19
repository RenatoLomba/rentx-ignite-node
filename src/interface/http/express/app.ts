import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swaggerUI from 'swagger-ui-express';

import '@application/shared/libs/tsyringe/container';
import { AppError } from '@application/shared/errors/AppError';
import createConnection from '@infra/database/typeorm';

import { router } from './routes';
import swaggerConfig from './swagger.json';

createConnection();

const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerConfig));
app.use(router);
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response
        .status(error.statusCode)
        .json({ error: { code: error.statusCode, message: error.message } });
    }

    return response.status(500).json({
      error: {
        code: 500,
        message: `Internal Server Error - ${error.message}`,
      },
    });
  },
);

export { app };

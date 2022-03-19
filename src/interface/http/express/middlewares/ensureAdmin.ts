import { NextFunction, Request, Response } from 'express';

import { AppError } from '@application/shared/errors/AppError';

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { isAdmin } = request.user;

  if (!isAdmin) {
    throw new AppError('Restrict access!', 401);
  }

  next();
}

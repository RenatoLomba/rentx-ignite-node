import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '@application/shared/errors/AppError';
import { JWTEnum } from '@domain/enums/accounts/JWTEnum';
import { UsersRepository } from '@infra/repositories/implementations/accounts/typeorm/UsersRepository';

enum EnsureAuthenticatedErrors {
  MissingToken = 'Missing Token!',
  InvalidToken = 'Invalid Token!',
  UnknownToken = 'Unknown Token error!',
  InvalidUser = 'Invalid User!',
}

interface IPayload {
  sub: string;
}

function verifyToken(token: string): IPayload {
  try {
    const decoded = verify(token, JWTEnum.Secret);

    if (typeof decoded === 'string') {
      throw new AppError(EnsureAuthenticatedErrors.UnknownToken, 401);
    }

    return { sub: decoded.sub };
  } catch (ex) {
    throw new AppError(EnsureAuthenticatedErrors.InvalidToken, 401);
  }
}

async function verifyUserById(userId: string) {
  const usersRepository = new UsersRepository();
  const user = await usersRepository.findById(userId);

  if (!user) {
    throw new AppError(EnsureAuthenticatedErrors.InvalidUser, 401);
  }

  return user;
}

async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new AppError(EnsureAuthenticatedErrors.MissingToken, 401);
  }

  const [, token] = authorization.split(' ');

  const { sub: user_id } = verifyToken(token);

  const user = await verifyUserById(user_id);

  request.user = { email: user.email, id: user.id };

  next();
}

export { ensureAuthenticated };

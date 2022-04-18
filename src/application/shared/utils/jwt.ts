import { sign } from 'jsonwebtoken';

import { JWTEnum } from '@domain/enums/accounts/JWTEnum';

interface IFnGenerateJwtParams {
  subject: string;
  payload?: Record<string, unknown>;
  secret?: string;
  expiresIn?: string;
}

export const generateJWT = ({
  payload = {},
  subject,
  secret = JWTEnum.Secret,
  expiresIn = JWTEnum.ExpiresIn,
}: IFnGenerateJwtParams) => {
  const token = sign(payload, secret, {
    subject,
    expiresIn,
  });

  return token;
};

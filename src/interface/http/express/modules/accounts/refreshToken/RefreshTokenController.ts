import { Request, Response } from 'express';

import { RefreshTokenUseCase } from '@application/usecases/accounts/refreshToken/RefreshTokenUseCase';

import { BaseController } from '../../BaseController';

export class RefreshTokenController extends BaseController<RefreshTokenUseCase> {
  constructor() {
    super(RefreshTokenUseCase);
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const token: string =
      request.body.token ||
      request.headers['x-access-token'] ||
      request.query.token;

    const { refresh_token, token: new_token } = await this.useCase.execute(
      token,
    );

    return response.json({ refresh_token, token: new_token });
  }
}

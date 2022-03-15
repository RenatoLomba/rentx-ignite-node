import { Request, Response } from 'express';

import { AuthenticateUserUseCase } from '@application/usecases/accounts/authenticateUser/AuthenticateUserUseCase';

import { BaseController } from '../../BaseController';

class AuthenticateUserController extends BaseController<AuthenticateUserUseCase> {
  constructor() {
    super(AuthenticateUserUseCase);
  }

  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const authResponse = await this.useCase.execute({
      email,
      password,
    });

    return response.status(200).json(authResponse);
  }
}

export { AuthenticateUserController };

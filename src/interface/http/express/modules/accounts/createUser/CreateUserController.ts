import { Request, Response } from 'express';

import { CreateUserUseCase } from '@application/usecases/accounts/createUser/CreateUserUseCase';

import { BaseController } from '../../BaseController';

class CreateUserController extends BaseController<CreateUserUseCase> {
  constructor() {
    super(CreateUserUseCase);
  }

  async handle(request: Request, response: Response) {
    const { driver_license, email, name, password } = request.body;

    const user = await this.useCase.execute({
      driver_license,
      email,
      name,
      password,
    });

    return response.status(201).json({ user });
  }
}

export { CreateUserController };

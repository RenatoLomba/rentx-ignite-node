import { Request, Response } from 'express';

import { ProfileUserUseCase } from '@application/usecases/accounts/profileUser/ProfileUserUseCase';

import { BaseController } from '../../BaseController';

export class ProfileUserController extends BaseController<ProfileUserUseCase> {
  constructor() {
    super(ProfileUserUseCase);
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const user = await this.useCase.execute(id);

    return response.json({ user });
  }
}

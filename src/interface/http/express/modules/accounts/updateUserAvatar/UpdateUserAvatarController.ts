import { Request, Response } from 'express';

import { UpdateUserAvatarUseCase } from '@application/usecases/accounts/updateUserAvatar/UpdateUserAvatarUseCase';

import { BaseController } from '../../BaseController';

class UpdateUserAvatarController extends BaseController<UpdateUserAvatarUseCase> {
  constructor() {
    super(UpdateUserAvatarUseCase);
  }

  async handle(request: Request, response: Response) {
    const { id: user_id } = request.user;
    const avatar_file = request.file.filename;

    const user = await this.useCase.execute({
      user_id,
      avatar_file,
    });

    return response.status(200).json({ user });
  }
}

export { UpdateUserAvatarController };

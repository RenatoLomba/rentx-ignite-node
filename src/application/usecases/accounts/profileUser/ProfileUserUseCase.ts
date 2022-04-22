import { inject, injectable } from 'tsyringe';

import { User } from '@infra/entities/accounts/typeorm/User';
import { IUsersRepository } from '@infra/repositories/interface/accounts/IUsersRepository';

import { AppError } from '../../../shared/errors/AppError';
import { IUseCase } from '../../IUseCase';

@injectable()
export class ProfileUserUseCase implements IUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute(userId: string) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found!');
    }

    const userDomain = User.toDomain(user);

    return userDomain.toResponse();
  }
}

import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { ResetUserPasswordDTO } from '@domain/dtos/accounts/ResetUserPasswordDTO';
import { IUsersRepository } from '@infra/repositories/interface/accounts/IUsersRepository';
import { IUserTokensRepository } from '@infra/repositories/interface/accounts/IUserTokensRepository';

import { AppError } from '../../../shared/errors/AppError';
import { IUseCase } from '../../IUseCase';

@injectable()
export class ResetUserPasswordUseCase implements IUseCase {
  constructor(
    @inject('UserTokensRepository')
    private readonly userTokensRepository: IUserTokensRepository,
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  public async execute(dto: ResetUserPasswordDTO): Promise<void> {
    const userToken = await this.userTokensRepository.findByRefreshToken(
      dto.token,
    );

    if (!userToken) {
      throw new AppError('Invalid token!');
    }

    if (userToken.tokenIsExpired()) {
      throw new AppError('Token expired!');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User not found!');
    }

    user.password = await hash(dto.password, 8);

    await this.usersRepository.create(user);

    await this.userTokensRepository.deleteById(userToken.id);
  }
}

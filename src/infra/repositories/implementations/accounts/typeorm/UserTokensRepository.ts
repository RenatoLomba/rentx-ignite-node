import { plainToClass } from 'class-transformer';
import { getRepository, Repository } from 'typeorm';

import { UserTokens } from '@domain/entities/accounts/UserTokens';

import { UserTokensEntity } from '../../../../entities/accounts/typeorm/UserTokensEntity';
import { IUserTokensRepository } from '../../../interface/accounts/IUserTokensRepository';

export class UserTokensRepository implements IUserTokensRepository {
  private readonly repository: Repository<UserTokensEntity>;

  constructor() {
    this.repository = getRepository(UserTokensEntity);
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserTokens> {
    const userToken = await this.repository.findOne({
      where: { user_id, refresh_token },
    });

    return plainToClass(UserTokens, userToken);
  }

  async create(entity: UserTokens): Promise<UserTokens> {
    const createdUserToken = this.repository.create(entity);

    await this.repository.save(createdUserToken);

    return plainToClass(UserTokens, createdUserToken);
  }
}

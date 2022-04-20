import { plainToClass } from 'class-transformer';

import { UserTokens } from '../../../../../domain/entities/accounts/UserTokens';
import { UserTokensEntity } from '../../../../entities/accounts/typeorm/UserTokensEntity';
import { IUserTokensRepository } from '../../../interface/accounts/IUserTokensRepository';

export class UserTokensRepositoryInMemory implements IUserTokensRepository {
  private userTokens: UserTokensEntity[] = [];

  async create(entity: UserTokens): Promise<UserTokens> {
    const userToken = plainToClass(UserTokensEntity, entity);

    this.userTokens.push(userToken);

    return plainToClass(UserTokens, userToken);
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserTokens> {
    const userToken = this.userTokens.find(
      (ut) => ut.user_id === user_id && ut.refresh_token === refresh_token,
    );

    if (!userToken) return null;

    return plainToClass(UserTokens, userToken);
  }

  async deleteById(id: string): Promise<void> {
    const userTokenIndex = this.userTokens.findIndex((ut) => ut.id === id);

    this.userTokens.splice(userTokenIndex, 1);
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const userToken = this.userTokens.find(
      (ut) => ut.refresh_token === refresh_token,
    );

    if (!userToken) return null;

    return plainToClass(UserTokens, userToken);
  }
}

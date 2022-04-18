import { UserTokens } from '@domain/entities/accounts/UserTokens';

export interface IUserTokensRepository {
  create(entity: UserTokens): Promise<UserTokens>;
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserTokens>;
  deleteById(id: string): Promise<void>;
}

import { plainToClass } from 'class-transformer';
import { verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { UserTokens } from '@domain/entities/accounts/UserTokens';
import { JWTEnum } from '@domain/enums/accounts/JWTEnum';
import { RefreshTokenEnum } from '@domain/enums/accounts/RefreshTokenEnum';
import { IUserTokensRepository } from '@infra/repositories/interface/accounts/IUserTokensRepository';

import { AppError } from '../../../shared/errors/AppError';
import { addDaysToDate } from '../../../shared/utils/date';
import { generateJWT } from '../../../shared/utils/jwt';
import { IUseCase } from '../../IUseCase';

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
export class RefreshTokenUseCase implements IUseCase {
  constructor(
    @inject('UserTokensRepository')
    private readonly userTokensRepository: IUserTokensRepository,
  ) {}

  async execute(token: string) {
    const { sub: user_id, email: user_email } = verify(
      token,
      JWTEnum.RefreshSecret,
    ) as IPayload;

    const userToken =
      await this.userTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        token,
      );

    if (!userToken) {
      throw new AppError(RefreshTokenEnum.INVALID_REFRESH_TOKEN_ERROR);
    }

    if (userToken.tokenIsExpired()) {
      await this.userTokensRepository.deleteById(userToken.id);

      throw new AppError(RefreshTokenEnum.REFRESH_TOKEN_EXPIRED_ERROR);
    }

    await this.userTokensRepository.deleteById(userToken.id);

    const refresh_token = await this.createNewRefreshToken(user_id, user_email);

    const new_token = generateJWT({ subject: user_id });

    return { refresh_token, token: new_token };
  }

  private async createNewRefreshToken(user_id: string, email: string) {
    const refresh_token = generateJWT({
      subject: user_id,
      secret: JWTEnum.RefreshSecret as string,
      expiresIn: JWTEnum.RefreshExpiresIn as string,
      payload: { email },
    });

    const expires_date = addDaysToDate(JWTEnum.RefreshExpiresInDays);

    await this.userTokensRepository.create(
      plainToClass(UserTokens, {
        expires_date,
        refresh_token,
        user_id,
      }),
    );

    return refresh_token;
  }
}

import { compare } from 'bcryptjs';
import { plainToClass } from 'class-transformer';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@application/shared/errors/AppError';
import { IUseCase } from '@application/usecases/IUseCase';
import { IAuthenticateUserDTO } from '@domain/dtos/accounts/IAuthenticateUserCTO';
import { IAuthResponseDTO } from '@domain/dtos/accounts/IAuthResponseDTO';
import { IUser } from '@domain/entities/accounts/IUser';
import { UserTokens } from '@domain/entities/accounts/UserTokens';
import { AuthenticateUserEnum } from '@domain/enums/accounts/AuthenticateUserEnum';
import { JWTEnum } from '@domain/enums/accounts/JWTEnum';
import { IUsersRepository } from '@infra/repositories/interface/accounts/IUsersRepository';
import { IUserTokensRepository } from '@infra/repositories/interface/accounts/IUserTokensRepository';

import { addDaysToDate } from '../../../shared/utils/date';
import { generateJWT } from '../../../shared/utils/jwt';

@injectable()
class AuthenticateUserUseCase implements IUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
    @inject('UserTokensRepository')
    private readonly userTokensRepository: IUserTokensRepository,
  ) {}

  async execute({
    email,
    password,
  }: IAuthenticateUserDTO): Promise<IAuthResponseDTO> {
    const user = await this.verifyUserExists(email);

    await this.verifyPasswordIsCorrect(password, user.password);

    const token = generateJWT({ subject: user.id });

    const refresh_token = await this.createRefreshToken(user);

    return {
      user: {
        email: user.email,
        name: user.name,
      },
      token,
      refresh_token,
    };
  }

  private async createRefreshToken(user: IUser) {
    const refresh_token = generateJWT({
      subject: user.id,
      secret: JWTEnum.RefreshSecret as string,
      expiresIn: JWTEnum.RefreshExpiresIn as string,
      payload: { email: user.email },
    });

    const expires_date = addDaysToDate(JWTEnum.RefreshExpiresInDays);

    await this.userTokensRepository.create(
      plainToClass(UserTokens, {
        expires_date,
        refresh_token,
        user_id: user.id,
      }),
    );

    return refresh_token;
  }

  private async verifyUserExists(email: string) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError(
        AuthenticateUserEnum.EMAIL_OR_PASSWORD_INCORRECT_ERROR,
      );
    }

    return user;
  }

  private async verifyPasswordIsCorrect(
    password: string,
    userPassword: string,
  ) {
    const passwordIsCorrect = await compare(password, userPassword);

    if (!passwordIsCorrect) {
      throw new AppError(
        AuthenticateUserEnum.EMAIL_OR_PASSWORD_INCORRECT_ERROR,
      );
    }
  }
}

export { AuthenticateUserUseCase };

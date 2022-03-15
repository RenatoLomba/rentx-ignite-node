import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@application/shared/errors/AppError';
import { IUseCase } from '@application/usecases/IUseCase';
import { IAuthenticateUserDTO } from '@domain/dtos/accounts/IAuthenticateUserCTO';
import { IAuthResponseDTO } from '@domain/dtos/accounts/IAuthResponseDTO';
import { IUser } from '@domain/entities/accounts/IUser';
import { AuthenticateUserEnum } from '@domain/enums/accounts/AuthenticateUserEnum';
import { JWTEnum } from '@domain/enums/accounts/JWTEnum';
import { IUsersRepository } from '@infra/repositories/interface/accounts/IUsersRepository';

@injectable()
class AuthenticateUserUseCase implements IUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute({
    email,
    password,
  }: IAuthenticateUserDTO): Promise<IAuthResponseDTO> {
    const user = await this.verifyUserExists(email);

    await this.verifyPasswordIsCorrect(password, user.password);

    const token = this.generateJWT(user);

    return {
      user: {
        email: user.email,
        name: user.name,
      },
      token,
    };
  }

  private generateJWT(user: IUser) {
    const token = sign({}, JWTEnum.Secret, {
      subject: user.id,
      expiresIn: JWTEnum.ExpiresIn,
    });

    return token;
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

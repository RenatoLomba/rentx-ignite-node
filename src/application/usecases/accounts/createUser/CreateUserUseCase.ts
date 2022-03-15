import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@application/shared/errors/AppError';
import { IUseCase } from '@application/usecases/IUseCase';
import { ICreateUserDTO } from '@domain/dtos/accounts/ICreateUserDTO';
import { CreateUserEnum } from '@domain/enums/accounts/CreateUserEnum';
import { IUsersRepository } from '@infra/repositories/interface/accounts/IUsersRepository';

@injectable()
class CreateUserUseCase implements IUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute({ driver_license, email, name, password }: ICreateUserDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError(CreateUserEnum.USER_ALREADY_EXISTS_ERROR);
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      driver_license,
      email,
      name,
      password: hashedPassword,
    });

    return user;
  }
}

export { CreateUserUseCase };

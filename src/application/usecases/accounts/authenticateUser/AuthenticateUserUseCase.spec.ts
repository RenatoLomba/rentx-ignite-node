import 'reflect-metadata';
import { AppError } from '@application/shared/errors/AppError';
import { IAuthenticateUserDTO } from '@domain/dtos/accounts/IAuthenticateUserCTO';
import { ICreateUserDTO } from '@domain/dtos/accounts/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@infra/repositories/implementations/accounts/in-memory/UsersRepositoryInMemory';
import { IUsersRepository } from '@infra/repositories/interface/accounts/IUsersRepository';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let usersRepository: IUsersRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

const createUserDTO: ICreateUserDTO = {
  email: 'test@email.com',
  name: 'test-name',
  password: 'test-password',
  driver_license: '123-456-789',
};

const authenticateUserDTO: IAuthenticateUserDTO = {
  email: 'test@email.com',
  password: 'test-password',
};

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);
    createUserUseCase = new CreateUserUseCase(usersRepository);
  });

  it('should be able to authenticate user', async () => {
    await createUserUseCase.execute(createUserDTO);

    const authResponse = await authenticateUserUseCase.execute(
      authenticateUserDTO,
    );

    expect(authResponse).toHaveProperty('token');
    expect(authResponse).toHaveProperty('user');
  });

  it('should not be able to authenticate user when email not exists', async () => {
    const execution = async () => {
      await authenticateUserUseCase.execute(authenticateUserDTO);
    };

    expect(execution).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate user when password is incorrect', async () => {
    const execution = async () => {
      await createUserUseCase.execute(createUserDTO);
      await authenticateUserUseCase.execute({
        ...authenticateUserDTO,
        password: 'incorrect-password',
      });
    };

    expect(execution).rejects.toBeInstanceOf(AppError);
  });
});

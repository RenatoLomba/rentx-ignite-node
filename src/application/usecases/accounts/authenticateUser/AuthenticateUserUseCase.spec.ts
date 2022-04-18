import 'reflect-metadata';
import { AppError } from '@application/shared/errors/AppError';
import { IAuthenticateUserDTO } from '@domain/dtos/accounts/IAuthenticateUserCTO';
import { ICreateUserDTO } from '@domain/dtos/accounts/ICreateUserDTO';
import { AuthenticateUserEnum } from '@domain/enums/accounts/AuthenticateUserEnum';
import { UsersRepositoryInMemory } from '@infra/repositories/implementations/accounts/in-memory/UsersRepositoryInMemory';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

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

const createInstanceOfUseCase = (): {
  authenticateUserUseCase: AuthenticateUserUseCase;
  createUserUseCase: CreateUserUseCase;
} => {
  const usersRepository = new UsersRepositoryInMemory();
  const authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);
  const createUserUseCase = new CreateUserUseCase(usersRepository);

  return { authenticateUserUseCase, createUserUseCase };
};

describe('Authenticate User', () => {
  it('should be able to authenticate user', async () => {
    // Given
    const { authenticateUserUseCase, createUserUseCase } =
      createInstanceOfUseCase();
    await createUserUseCase.execute(createUserDTO);

    // When
    const authResponse = await authenticateUserUseCase.execute(
      authenticateUserDTO,
    );

    // Then
    expect(authResponse).toHaveProperty('token');
    expect(authResponse).toHaveProperty('user');
  });

  it('should not be able to authenticate user when email not exists', async () => {
    // Given
    const { authenticateUserUseCase } = createInstanceOfUseCase();
    const expectedResult = new AppError(
      AuthenticateUserEnum.EMAIL_OR_PASSWORD_INCORRECT_ERROR,
    );

    // When
    const execution = async () => {
      await authenticateUserUseCase.execute(authenticateUserDTO);
    };

    // Then
    expect(execution).rejects.toEqual(expectedResult);
  });

  it('should not be able to authenticate user when password is incorrect', async () => {
    // Given
    const { authenticateUserUseCase, createUserUseCase } =
      createInstanceOfUseCase();
    await createUserUseCase.execute(createUserDTO);
    const expectedResult = new AppError(
      AuthenticateUserEnum.EMAIL_OR_PASSWORD_INCORRECT_ERROR,
    );

    // When
    const execution = async () => {
      await authenticateUserUseCase.execute({
        ...authenticateUserDTO,
        password: 'incorrect-password',
      });
    };

    // Then
    expect(execution).rejects.toEqual(expectedResult);
  });
});

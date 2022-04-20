import { SendForgotPasswordMailEnum } from '@domain/enums/accounts/SendForgotPasswordMailEnum';
import { UsersRepositoryInMemory } from '@infra/repositories/implementations/accounts/in-memory/UsersRepositoryInMemory';
import { UserTokensRepositoryInMemory } from '@infra/repositories/implementations/accounts/in-memory/UserTokensRepositoryInMemory';
import { IUsersRepository } from '@infra/repositories/interface/accounts/IUsersRepository';
import { IUserTokensRepository } from '@infra/repositories/interface/accounts/IUserTokensRepository';

import { AppError } from '../../../shared/errors/AppError';
import { IMailProvider } from '../../../shared/providers/MailProvider/IMailProvider';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let usersRepository: IUsersRepository;
let userTokensRepository: IUserTokensRepository;

const createUser = async () => {
  const createUserUseCase = new CreateUserUseCase(usersRepository);

  const user = await createUserUseCase.execute({
    email: 'oze@sed.sn',
    name: 'Sallie McKinney',
    driver_license: 'ABC-9147',
    password: '1234',
  });

  return user;
};

const createInstance = ({
  sendMailMock,
}: {
  sendMailMock: jest.Mock;
}): SendForgotPasswordMailUseCase => {
  const mailProvider: IMailProvider = {
    sendMail: sendMailMock,
  };

  return new SendForgotPasswordMailUseCase(
    usersRepository,
    userTokensRepository,
    mailProvider,
  );
};

describe('Send Forgot Password Mail', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    userTokensRepository = new UserTokensRepositoryInMemory();
  });

  it('Should be able to send a forgot password mail to user', async () => {
    // Given
    const sendMailMock = jest.fn();
    const useCase = createInstance({ sendMailMock });
    const user = await createUser();

    // When
    await useCase.execute(user.email);

    // Then
    expect(sendMailMock).toHaveBeenCalled();
  });

  it('Should not be able to send a forgot password mail to an inexistent user', async () => {
    // Given
    const sendMailMock = jest.fn();
    const useCase = createInstance({ sendMailMock });
    const expectedResult = new AppError(
      SendForgotPasswordMailEnum.USER_NOT_FOUND,
    );

    // When
    const execution = async () => {
      await useCase.execute('oze@sed.sn');
    };

    // Then
    expect(execution).rejects.toEqual(expectedResult);
    expect(sendMailMock).not.toHaveBeenCalled();
  });

  it('Should create a new user token', async () => {
    // Given
    const createUserTokenSpy = jest.spyOn(userTokensRepository, 'create');
    const sendMailMock = jest.fn();
    const useCase = createInstance({ sendMailMock });
    const user = await createUser();

    // When
    await useCase.execute(user.email);

    // Then
    expect(createUserTokenSpy).toHaveBeenCalled();
  });
});

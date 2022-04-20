import { plainToClass } from 'class-transformer';
import { resolve } from 'path';
import { inject, injectable } from 'tsyringe';
import { v4 as uuid } from 'uuid';

import { UserTokens } from '@domain/entities/accounts/UserTokens';
import { SendForgotPasswordMailEnum } from '@domain/enums/accounts/SendForgotPasswordMailEnum';
import { IUsersRepository } from '@infra/repositories/interface/accounts/IUsersRepository';
import { IUserTokensRepository } from '@infra/repositories/interface/accounts/IUserTokensRepository';

import { AppError } from '../../../shared/errors/AppError';
import { IMailProvider } from '../../../shared/providers/MailProvider/IMailProvider';
import { addHoursToDate } from '../../../shared/utils/date';
import { IUseCase } from '../../IUseCase';

@injectable()
export class SendForgotPasswordMailUseCase implements IUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
    @inject('UserTokensRepository')
    private readonly userTokensRepository: IUserTokensRepository,
    @inject('MailProvider')
    private readonly mailProvider: IMailProvider,
  ) {}

  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError(SendForgotPasswordMailEnum.USER_NOT_FOUND);
    }

    const token = uuid();

    const expires_date = addHoursToDate(3);

    await this.userTokensRepository.create(
      plainToClass(UserTokens, {
        refresh_token: token,
        user_id: user.id,
        expires_date,
      }),
    );

    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      '..',
      'shared',
      'views',
      'emails',
      'forgotPassword.hbs',
    );

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`,
    };

    await this.mailProvider.sendMail(
      email,
      'Recuperação de senha',
      templatePath,
      variables,
    );
  }
}

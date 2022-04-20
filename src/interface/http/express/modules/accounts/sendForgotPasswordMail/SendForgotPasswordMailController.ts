import { Request, Response } from 'express';

import { SendForgotPasswordMailUseCase } from '@application/usecases/accounts/sendForgotPasswordMail/SendForgotPasswordMailUseCase';

import { BaseController } from '../../BaseController';

export class SendForgotPasswordMailController extends BaseController<SendForgotPasswordMailUseCase> {
  constructor() {
    super(SendForgotPasswordMailUseCase);
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    await this.useCase.execute(email);

    return response.send();
  }
}

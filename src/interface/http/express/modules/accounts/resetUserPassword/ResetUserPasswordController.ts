import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';

import { ResetUserPasswordUseCase } from '@application/usecases/accounts/resetUserPassword/ResetUserPasswordUseCase';
import { ResetUserPasswordDTO } from '@domain/dtos/accounts/ResetUserPasswordDTO';

import { BaseController } from '../../BaseController';

export class ResetUserPasswordController extends BaseController<ResetUserPasswordUseCase> {
  constructor() {
    super(ResetUserPasswordUseCase);
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.query;
    const { password } = request.body;

    const dto = plainToClass(ResetUserPasswordDTO, { token, password });

    const validationResult = dto.validateSelf();

    if (!validationResult.isValid) {
      return response.status(400).json({ errors: validationResult.errors });
    }

    await this.useCase.execute(dto);

    return response.send();
  }
}

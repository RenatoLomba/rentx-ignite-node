import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';

import { AppError } from '@application/shared/errors/AppError';
import { ReturnCarUseCase } from '@application/usecases/rentals/returnCar/ReturnCarUseCase';
import { ReturnCarDTO } from '@domain/dtos/rentals/ReturnCarDTO';

import { BaseController } from '../../BaseController';

export class ReturnCarController extends BaseController<ReturnCarUseCase> {
  constructor() {
    super(ReturnCarUseCase);
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const { id: rental_id } = request.params;
    const { id: user_id } = request.user;

    const dto = plainToClass(ReturnCarDTO, {
      rental_id,
      user_id,
    });

    const validationResult = dto.validateSelf();

    if (!validationResult.isValid) {
      throw new AppError(validationResult.errors);
    }

    const rental = await this.useCase.execute(dto);

    return response.status(200).json({ rental });
  }
}

import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';

import { AppError } from '../../../../../application/shared/errors/AppError';
import { toUTCDate } from '../../../../../application/shared/utils/date';
import { CreateRentalUseCase } from '../../../../../application/usecases/rentals/createRental/CreateRentalUseCase';
import { CreateRentalDTO } from '../../../../../domain/dtos/rentals/CreateRentalDTO';
import { BaseController } from '../BaseController';

export class CreateRentalController extends BaseController<CreateRentalUseCase> {
  constructor() {
    super(CreateRentalUseCase);
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { car_id, expected_return_date, start_date } = request.body;

    const expectedReturnDate = toUTCDate(expected_return_date);
    const startDate = start_date && toUTCDate(start_date);

    const dto = plainToClass(CreateRentalDTO, {
      car_id,
      user_id: id,
      start_date: startDate,
      expected_return_date: expectedReturnDate,
    });

    const validationResult = dto.validateSelf();

    if (!validationResult.isValid) {
      throw new AppError(validationResult.errors);
    }

    const rental = await this.useCase.execute(dto);

    return response.status(201).json({ rental });
  }
}

import { Request, Response } from 'express';

import { CreateCarUseCase } from '@application/usecases/cars/createCar/CreateCarUseCase';
import { ICreateCarDTO } from '@domain/dtos/cars/ICreateCarDTO';

import { BaseController } from '../../BaseController';

export class CreateCarController extends BaseController<CreateCarUseCase> {
  constructor() {
    super(CreateCarUseCase);
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    } = request.body as ICreateCarDTO;

    const car = await this.useCase.execute({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });

    return response.status(201).json({ car });
  }
}

import { Request, Response } from 'express';

import { CreateCarSpecificationUseCase } from '../../../../../../application/usecases/cars/createCarSpecification/CreateCarSpecificationUseCase';
import { BaseController } from '../../BaseController';

export class CreateCarSpecificationController extends BaseController<CreateCarSpecificationUseCase> {
  constructor() {
    super(CreateCarSpecificationUseCase);
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { specifications_ids } = request.body;

    const car = await this.useCase.execute({
      car_id: id,
      specifications_ids,
    });

    return response.json({ car });
  }
}

import { Request, Response } from 'express';

import { CreateSpecificationUseCase } from '@application/usecases/cars/createSpecification/CreateSpecificationUseCase';

import { BaseController } from '../../BaseController';

export class CreateSpecificationController extends BaseController<CreateSpecificationUseCase> {
  constructor() {
    super(CreateSpecificationUseCase);
  }

  async handle(request: Request, response: Response) {
    const { name, description } = request.body;

    const specification = await this.useCase.execute({
      description,
      name,
    });

    return response.status(201).json({ specification });
  }
}

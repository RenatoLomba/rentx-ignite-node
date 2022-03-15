import { Request, Response } from 'express';

import { CreateCategoryUseCase } from '@application/usecases/cars/createCategory/CreateCategoryUseCase';

import { BaseController } from '../../BaseController';

class CreateCategoryController extends BaseController<CreateCategoryUseCase> {
  constructor() {
    super(CreateCategoryUseCase);
  }

  async handle(request: Request, response: Response) {
    const { name, description } = request.body;

    const category = await this.useCase.execute({
      description,
      name,
    });

    return response.status(201).json({ category });
  }
}

export { CreateCategoryController };

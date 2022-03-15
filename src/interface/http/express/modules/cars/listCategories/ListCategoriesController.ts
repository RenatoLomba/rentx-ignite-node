import { Request, Response } from 'express';

import { ListCategoriesUseCase } from '@application/usecases/cars/listCategories/ListCategoriesUseCase';

import { BaseController } from '../../BaseController';

class ListCategoriesController extends BaseController<ListCategoriesUseCase> {
  constructor() {
    super(ListCategoriesUseCase);
  }

  async handle(request: Request, response: Response) {
    const categories = await this.useCase.execute();

    return response.json({ categories });
  }
}

export { ListCategoriesController };

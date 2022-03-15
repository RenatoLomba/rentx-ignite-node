import { Request, Response } from 'express';

import { ImportCategoryUseCase } from '@application/usecases/cars/importCategory/ImportCategoryUseCase';

import { BaseController } from '../../BaseController';

export class ImportCategoryController extends BaseController<ImportCategoryUseCase> {
  constructor() {
    super(ImportCategoryUseCase);
  }

  async handle(request: Request, response: Response) {
    const { file } = request;

    const categories = await this.useCase.execute(file);

    return response.status(201).json(categories);
  }
}

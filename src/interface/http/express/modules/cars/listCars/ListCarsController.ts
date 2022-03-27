import { Request, Response } from 'express';

import { ListCarsUseCase } from '@application/usecases/cars/listCars/ListCarsUseCase';

import { BaseController } from '../../BaseController';

interface IQueryParams {
  category?: string;
  name?: string;
  brand: string;
}

export class ListCarsController extends BaseController<ListCarsUseCase> {
  constructor() {
    super(ListCarsUseCase);
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const { category, name, brand } = request.query as unknown as IQueryParams;

    const cars = await this.useCase.execute({
      carBrand: brand,
      carName: name,
      categoryId: category,
    });

    return response.status(200).json({ cars });
  }
}

import { Request, Response } from 'express';

import { ListUserRentalsUseCase } from '../../../../../../application/usecases/rentals/listUserRentals/ListUserRentalsUseCase';
import { BaseController } from '../../BaseController';

export class ListUserRentalsController extends BaseController<ListUserRentalsUseCase> {
  constructor() {
    super(ListUserRentalsUseCase);
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;

    const rentals = await this.useCase.execute(user_id);

    return response.json({ rentals });
  }
}

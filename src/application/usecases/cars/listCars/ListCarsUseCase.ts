import { inject, injectable } from 'tsyringe';

import { IUseCase } from '@application/usecases/IUseCase';
import { IListCarsFilters } from '@domain/dtos/cars/IListCarsFilters';
import { ICarsRepository } from '@infra/repositories/interface/cars/ICarsRepository';

@injectable()
export class ListCarsUseCase implements IUseCase {
  constructor(
    @inject('CarsRepository')
    private readonly carsRepository: ICarsRepository,
  ) {}

  public async execute(filters: IListCarsFilters) {
    const cars = await this.carsRepository.findAvailable(filters);

    return cars;
  }
}

import { FindConditions } from 'typeorm';

import { IListCarsFilters } from '@domain/dtos/cars/IListCarsFilters';
import { ICar } from '@domain/entities/cars/ICar';
import { Car } from '@infra/entities/cars/typeorm/Car';
import { ICarsRepository } from '@infra/repositories/interface/cars/ICarsRepository';
import { Repository } from '@infra/repositories/TypeormRepository';

export class CarsRepository extends Repository<Car> implements ICarsRepository {
  constructor() {
    super(Car);
  }

  async findAvailable(filters: IListCarsFilters): Promise<ICar[]> {
    const where: FindConditions<Car> = { available: true };

    if (filters.carBrand) {
      where.brand = filters.carBrand;
    }

    if (filters.carName) {
      where.name = filters.carName;
    }

    if (filters.categoryId) {
      where.category_id = filters.categoryId;
    }

    const carsList = await this.repository.find({
      where,
    });

    return carsList;
  }

  async findByLicensePlate(license_plate: string): Promise<ICar> {
    const car = await this.repository.findOne({ license_plate });

    return car;
  }
}

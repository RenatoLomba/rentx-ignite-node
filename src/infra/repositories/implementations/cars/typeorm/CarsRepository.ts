import { FindConditions } from 'typeorm';

import { IListCarsFilters } from '@domain/dtos/cars/IListCarsFilters';
import { ICar } from '@domain/entities/cars/ICar';
import { Car } from '@infra/entities/cars/typeorm/Car';
import { ICarsRepository } from '@infra/repositories/interface/cars/ICarsRepository';
import { Repository } from '@infra/repositories/TypeormRepository';

import { ISpecification } from '../../../../../domain/entities/cars/ISpecification';

export class CarsRepository extends Repository<Car> implements ICarsRepository {
  constructor() {
    super(Car);
  }

  async findByIdWithImages(id: string): Promise<Car> {
    return this.repository.findOne(id, { relations: ['images'] });
  }

  async addSpecifications(
    carId: string,
    specifications: ISpecification[],
  ): Promise<ICar> {
    const car = await this.repository.findOne(carId);

    car.specifications = specifications;

    const updatedCar = this.repository.create(car);

    await this.repository.save(updatedCar);

    return updatedCar;
  }

  async updateAvailable(carId: string, available?: boolean): Promise<void> {
    const car = await this.repository.findOne(carId);

    car.available = !!available;

    const updatedCar = this.repository.create(car);

    await this.repository.save(updatedCar);
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

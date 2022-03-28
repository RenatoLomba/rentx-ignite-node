import { ICreateCarDTO } from '@domain/dtos/cars/ICreateCarDTO';
import { IListCarsFilters } from '@domain/dtos/cars/IListCarsFilters';
import { ICar } from '@domain/entities/cars/ICar';
import { Car } from '@infra/entities/cars/model/Car';
import { ICarsRepository } from '@infra/repositories/interface/cars/ICarsRepository';

import { ISpecification } from '../../../../../domain/entities/cars/ISpecification';

export class CarsRepositoryInMemory implements ICarsRepository {
  private cars: ICar[] = [];

  async findById(carId: string): Promise<ICar> {
    return this.cars.find((car) => car.id === carId);
  }

  async create(dto: ICreateCarDTO): Promise<ICar> {
    const car = new Car();

    Object.assign(car, { ...dto });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<ICar> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findAvailable(filters: IListCarsFilters): Promise<ICar[]> {
    let carsList = this.cars.filter((car) => !!car.available);

    if (filters.carName) {
      carsList = carsList.filter((car) => car.name === filters.carName);
    }

    if (filters.carBrand) {
      carsList = carsList.filter((car) => car.brand === filters.carBrand);
    }

    if (filters.categoryId) {
      carsList = carsList.filter(
        (car) => car.category_id === filters.categoryId,
      );
    }

    return carsList;
  }

  async addSpecifications(
    carId: string,
    specifications: ISpecification[],
  ): Promise<ICar> {
    this.cars = this.cars.map((car) => {
      const newCar = { ...car };

      if (carId === car.id) {
        newCar.specifications = specifications;
      }

      return newCar;
    });

    return this.cars.find((car) => car.id === carId);
  }
}

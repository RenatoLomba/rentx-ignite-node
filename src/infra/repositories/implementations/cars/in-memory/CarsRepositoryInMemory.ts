import { ICreateCarDTO } from '@domain/dtos/cars/ICreateCarDTO';
import { ICar } from '@domain/entities/cars/ICar';
import { Car } from '@infra/entities/cars/model/Car';
import { ICarsRepository } from '@infra/repositories/interface/cars/ICarsRepository';

export class CarsRepositoryInMemory implements ICarsRepository {
  private readonly cars: Car[] = [];

  async create(dto: ICreateCarDTO): Promise<ICar> {
    const car = new Car();

    Object.assign(car, { ...dto });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<ICar> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }
}

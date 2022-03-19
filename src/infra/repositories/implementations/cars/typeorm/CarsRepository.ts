import { ICar } from '@domain/entities/cars/ICar';
import { Car } from '@infra/entities/cars/typeorm/Car';
import { ICarsRepository } from '@infra/repositories/interface/cars/ICarsRepository';
import { Repository } from '@infra/repositories/TypeormRepository';

export class CarsRepository extends Repository<Car> implements ICarsRepository {
  constructor() {
    super(Car);
  }

  async findByLicensePlate(license_plate: string): Promise<ICar> {
    const car = await this.repository.findOne({ license_plate });

    return car;
  }
}

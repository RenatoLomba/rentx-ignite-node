import { plainToClass } from 'class-transformer';
import { getRepository, Repository } from 'typeorm';

import { Rental } from '../../../../domain/entities/rentals/Rental';
import { RentalEntity } from '../../../entities/rentals/typeorm/RentalEntity';
import { IRentalsRepository } from '../../interface/rentals/IRentalsRepository';

export class RentalsRepository implements IRentalsRepository {
  private readonly repository: Repository<RentalEntity>;

  constructor() {
    this.repository = getRepository(RentalEntity);
  }

  public async findOpenRentalByCar(car_id: string): Promise<Rental | null> {
    const rental = await this.repository.findOne({
      where: { car_id, end_date: null },
    });

    if (!rental) {
      return null;
    }

    return plainToClass(Rental, rental);
  }

  public async findOpenRentalByUser(user_id: string): Promise<Rental | null> {
    const rental = await this.repository.findOne({
      where: { user_id, end_date: null },
    });

    if (!rental) {
      return null;
    }

    return plainToClass(Rental, rental);
  }

  public async create(rental: Rental): Promise<Rental> {
    const createdRental = this.repository.create(rental);

    await this.repository.save(createdRental);

    return plainToClass(Rental, createdRental);
  }
}

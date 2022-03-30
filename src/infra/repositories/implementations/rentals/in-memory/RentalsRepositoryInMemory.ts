import { plainToClass } from 'class-transformer';

import { Rental } from '@domain/entities/rentals/Rental';

import { RentalEntity } from '../../../../entities/rentals/typeorm/RentalEntity';
import { IRentalsRepository } from '../../../interface/rentals/IRentalsRepository';

export class RentalsRepositoryInMemory implements IRentalsRepository {
  private rentals: RentalEntity[] = [];

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const rental = this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date,
    );

    if (!rental) return null;

    return plainToClass(Rental, rental);
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const rental = this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date,
    );

    if (!rental) return null;

    return plainToClass(Rental, rental);
  }

  async create(rental: Rental): Promise<Rental> {
    const createdRental = plainToClass(RentalEntity, {
      ...rental,
      created_at: new Date(),
      updated_at: new Date(),
      total: 0,
      end_date: null,
    });

    this.rentals.push(createdRental);

    return plainToClass(Rental, createdRental);
  }
}

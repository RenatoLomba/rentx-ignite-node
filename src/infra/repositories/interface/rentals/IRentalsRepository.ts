import { Rental } from '@domain/entities/rentals/Rental';

export interface IRentalsRepository {
  findById(id: string): Promise<Rental | null>;
  findOpenRentalByCar(car_id: string): Promise<Rental | null>;
  findOpenRentalByUser(user_id: string): Promise<Rental | null>;
  findByUserId(user_id: string): Promise<Rental[]>;
  create(rental: Rental): Promise<Rental>;
}

import { Rental } from '@domain/entities/rentals/Rental';

export interface IRentalsRepository {
  findOpenRentalByCar(car_id: string): Promise<Rental | null>;
  findOpenRentalByUser(user_id: string): Promise<Rental | null>;
  create(rental: Rental): Promise<Rental>;
}

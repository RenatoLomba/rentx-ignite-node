import { inject, injectable } from 'tsyringe';

import { Rental } from '@domain/entities/rentals/Rental';

import { IRentalsRepository } from '../../../../infra/repositories/interface/rentals/IRentalsRepository';
import { IUseCase } from '../../IUseCase';

@injectable()
export class ListUserRentalsUseCase implements IUseCase {
  constructor(
    @inject('RentalsRepository')
    private readonly rentalsRepository: IRentalsRepository,
  ) {}

  async execute(user_id: string): Promise<Rental[]> {
    const rentals = await this.rentalsRepository.findByUserId(user_id);

    return rentals;
  }
}

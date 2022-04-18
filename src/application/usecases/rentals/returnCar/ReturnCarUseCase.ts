import { inject, injectable } from 'tsyringe';

import { ReturnCarDTO } from '@domain/dtos/rentals/ReturnCarDTO';
import { Rental } from '@domain/entities/rentals/Rental';
import { ReturnCarEnum } from '@domain/enums/rentals/ReturnCarEnum';
import { ICarsRepository } from '@infra/repositories/interface/cars/ICarsRepository';
import { IRentalsRepository } from '@infra/repositories/interface/rentals/IRentalsRepository';

import { AppError } from '../../../shared/errors/AppError';
import { dateUTCNow } from '../../../shared/utils/date';
import { IUseCase } from '../../IUseCase';

@injectable()
export class ReturnCarUseCase implements IUseCase {
  constructor(
    @inject('RentalsRepository')
    private readonly rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private readonly carsRepository: ICarsRepository,
  ) {}

  async execute(dto: ReturnCarDTO): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(dto.rental_id);

    if (!rental) {
      throw new AppError(ReturnCarEnum.RENTAL_NOT_FOUND_ERROR);
    }

    if (rental.isFinished()) {
      throw new AppError(ReturnCarEnum.RENTAL_IS_ALREADY_FINISHED);
    }

    const car = await this.carsRepository.findById(rental.car_id);

    if (!car) {
      throw new AppError(ReturnCarEnum.CAR_NOT_FOUND_ERROR);
    }

    rental.end_date = dateUTCNow();

    rental.total = rental.calculateTotal(car.daily_rate, car.fine_amount);

    const updatedRental = await this.rentalsRepository.create(rental);

    await this.carsRepository.updateAvailable(rental.car_id, true);

    return updatedRental;
  }
}

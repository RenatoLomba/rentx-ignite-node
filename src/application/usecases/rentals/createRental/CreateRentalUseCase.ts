import { plainToClass } from 'class-transformer';
import { inject, injectable } from 'tsyringe';

import { CreateRentalDTO } from '@domain/dtos/rentals/CreateRentalDTO';
import { Rental } from '@domain/entities/rentals/Rental';
import { CreateRentalEnum } from '@domain/enums/rentals/CreateRentalEnum';
import { ICarsRepository } from '@infra/repositories/interface/cars/ICarsRepository';
import { IRentalsRepository } from '@infra/repositories/interface/rentals/IRentalsRepository';

import { AppError } from '../../../shared/errors/AppError';
import { IUseCase } from '../../IUseCase';

@injectable()
export class CreateRentalUseCase implements IUseCase {
  constructor(
    @inject('RentalsRepository')
    private readonly rentalsRepository: IRentalsRepository,

    @inject('CarsRepository')
    private readonly carsRepository: ICarsRepository,
  ) {}

  async execute(dto: CreateRentalDTO): Promise<Rental> {
    const carRental = await this.rentalsRepository.findOpenRentalByCar(
      dto.car_id,
    );

    if (!!carRental && !carRental.isFinished()) {
      throw new AppError(CreateRentalEnum.CAR_IS_UNAVAILABLE_ERROR);
    }

    const userRental = await this.rentalsRepository.findOpenRentalByUser(
      dto.user_id,
    );

    if (!!userRental && !userRental.isFinished()) {
      throw new AppError(
        CreateRentalEnum.USER_ALREADY_HAS_AN_UNFINISHED_RENT_ERROR,
      );
    }

    const rental = plainToClass(Rental, dto, { exposeUnsetFields: false });

    if (!rental.hasMinimumHoursToReturn()) {
      throw new AppError(CreateRentalEnum.MINIMUM_HOURS_TO_RETURN_ERROR);
    }

    const createdRental = await this.rentalsRepository.create(rental);

    await this.carsRepository.updateAvailable(createdRental.car_id, false);

    return createdRental;
  }
}

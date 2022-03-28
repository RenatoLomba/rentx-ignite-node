import { inject, injectable } from 'tsyringe';

import { AppError } from '@application/shared/errors/AppError';
import { IUseCase } from '@application/usecases/IUseCase';
import { ICreateCarDTO } from '@domain/dtos/cars/ICreateCarDTO';
import { ICar } from '@domain/entities/cars/ICar';
import { ICarsRepository } from '@infra/repositories/interface/cars/ICarsRepository';

import { CreateCarEnum } from '../../../../domain/enums/cars/CreateCarEnum';

@injectable()
class CreateCarUseCase implements IUseCase {
  constructor(
    @inject('CarsRepository')
    private readonly carsRepository: ICarsRepository,
  ) {}

  async execute(dto: ICreateCarDTO): Promise<ICar> {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(
      dto.license_plate,
    );

    if (carAlreadyExists) {
      throw new AppError(CreateCarEnum.CAR_ALREADY_EXISTS_ERROR);
    }

    const car = await this.carsRepository.create(dto);

    return car;
  }
}

export { CreateCarUseCase };

import { inject, injectable } from 'tsyringe';

import { ICreateCarSpecificationDTO } from '@domain/dtos/cars/ICreateCarSpecificationDTO';
import { ICar } from '@domain/entities/cars/ICar';
import { CreateCarSpecificationEnum } from '@domain/enums/cars/CreateCarSpecificationEnum';
import { ICarsRepository } from '@infra/repositories/interface/cars/ICarsRepository';
import { ISpecificationsRepository } from '@infra/repositories/interface/cars/ISpecificationsReposity';

import { AppError } from '../../../shared/errors/AppError';
import { IUseCase } from '../../IUseCase';

@injectable()
export class CreateCarSpecificationUseCase implements IUseCase {
  constructor(
    @inject('CarsRepository')
    private readonly carsRepository: ICarsRepository,

    @inject('SpecificationsRepository')
    private readonly specificationsRepository: ISpecificationsRepository,
  ) {}

  async execute(dto: ICreateCarSpecificationDTO): Promise<ICar> {
    const car = await this.carsRepository.findById(dto.car_id);

    if (!car) {
      throw new AppError(CreateCarSpecificationEnum.CAR_NOT_FOUND_ERROR);
    }

    const specifications = await this.specificationsRepository.findByIds(
      dto.specifications_ids,
    );

    const carWithSpecifications = await this.carsRepository.addSpecifications(
      car.id,
      specifications,
    );

    return carWithSpecifications;
  }
}

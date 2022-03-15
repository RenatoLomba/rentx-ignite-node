import { inject, injectable } from 'tsyringe';

import { AppError } from '@application/shared/errors/AppError';
import { IUseCase } from '@application/usecases/IUseCase';
import { ICreateSpecificationDTO } from '@domain/dtos/cars/ICreateSpecificationDTO';
import { CreateSpecificationEnum } from '@domain/enums/cars/CreateSpecificationEnum';
import { ISpecificationsRepository } from '@infra/repositories/interface/cars/ISpecificationsReposity';

@injectable()
class CreateSpecificationUseCase implements IUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private readonly specificationsRepository: ISpecificationsRepository,
  ) {}

  async execute({ description, name }: ICreateSpecificationDTO) {
    const specificationAlreadyExists =
      await this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new AppError(
        CreateSpecificationEnum.SPECIFICATION_ALREADY_EXISTS_ERROR,
      );
    }

    const specification = await this.specificationsRepository.create({
      description,
      name,
    });

    return specification;
  }
}

export { CreateSpecificationUseCase };

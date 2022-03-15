import { inject, injectable } from 'tsyringe';

import { AppError } from '@application/shared/errors/AppError';
import { IUseCase } from '@application/usecases/IUseCase';
import { ICreateCategoryDTO } from '@domain/dtos/cars/ICreateCategoryDTO';
import { CreateCategoryEnum } from '@domain/enums/cars/CreateCategoryEnum';
import { ICategoriesRepository } from '@infra/repositories/interface/cars/ICategoriesRepository';

@injectable()
class CreateCategoryUseCase implements IUseCase {
  constructor(
    @inject('CategoriesRepository')
    private readonly categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({ name, description }: ICreateCategoryDTO) {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name,
    );

    if (categoryAlreadyExists) {
      throw new AppError(CreateCategoryEnum.CATEGORY_ALREADY_EXISTS_ERROR);
    }

    const category = await this.categoriesRepository.create({
      description,
      name,
    });

    return category;
  }
}

export { CreateCategoryUseCase };

import { inject, injectable } from 'tsyringe';

import { IUseCase } from '@application/usecases/IUseCase';
import { ICategoriesRepository } from '@infra/repositories/interface/cars/ICategoriesRepository';

@injectable()
class ListCategoriesUseCase implements IUseCase {
  constructor(
    @inject('CategoriesRepository')
    private readonly categoriesRepository: ICategoriesRepository,
  ) {}

  async execute() {
    const categories = await this.categoriesRepository.list();

    return categories;
  }
}

export { ListCategoriesUseCase };

import { ICreateCategoryDTO } from '@domain/dtos/cars/ICreateCategoryDTO';
import { Category } from '@infra/entities/cars/model/Category';
import { ICategoriesRepository } from '@infra/repositories/interface/cars/ICategoriesRepository';

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  private categories: Category[] = [];

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name);

    return category;
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async create(createCategoryDTO: ICreateCategoryDTO): Promise<Category> {
    const category = new Category();

    Object.assign(category, { ...createCategoryDTO, created_at: new Date() });

    this.categories.push(category);

    return category;
  }
}

export { CategoriesRepositoryInMemory };

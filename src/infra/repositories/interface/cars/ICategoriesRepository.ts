import { ICreateCategoryDTO } from '@domain/dtos/cars/ICreateCategoryDTO';
import { ICategory } from '@domain/entities/cars/ICategory';

export interface ICategoriesRepository {
  findByName(name: string): Promise<ICategory>;
  list(): Promise<ICategory[]>;
  create(createCategoryDTO: ICreateCategoryDTO): Promise<ICategory>;
}

import 'reflect-metadata';
import { AppError } from '@application/shared/errors/AppError';
import { CategoriesRepositoryInMemory } from '@infra/repositories/implementations/cars/in-memory/CategoriesRepositoryInMemory';
import { ICategoriesRepository } from '@infra/repositories/interface/cars/ICategoriesRepository';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepository: ICategoriesRepository;

const createCategoryDTO = {
  name: 'test-name',
  description: 'test-description',
};

describe('Create Category', () => {
  beforeEach(() => {
    categoriesRepository = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
  });

  it('should be able to create a new category', async () => {
    const category = await createCategoryUseCase.execute(createCategoryDTO);

    expect(category.id).toBeTruthy();
    expect(category.name).toBe(createCategoryDTO.name);
  });

  it('should not be able to create a new category when name already exists', async () => {
    const execution = async () => {
      await createCategoryUseCase.execute(createCategoryDTO);

      await createCategoryUseCase.execute(createCategoryDTO);
    };

    expect(execution).rejects.toBeInstanceOf(AppError);
  });
});

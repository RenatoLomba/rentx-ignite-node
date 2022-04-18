import 'reflect-metadata';
import { AppError } from '@application/shared/errors/AppError';
import { CreateCategoryEnum } from '@domain/enums/cars/CreateCategoryEnum';
import { CategoriesRepositoryInMemory } from '@infra/repositories/implementations/cars/in-memory/CategoriesRepositoryInMemory';

import { CreateCategoryUseCase } from './CreateCategoryUseCase';

const createCategoryDTO = {
  name: 'test-name',
  description: 'test-description',
};

const createInstanceOfUseCase = (): CreateCategoryUseCase => {
  const categoriesRepository = new CategoriesRepositoryInMemory();
  const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);

  return createCategoryUseCase;
};

describe('Create Category', () => {
  it('should be able to create a new category', async () => {
    // Given
    const useCase = createInstanceOfUseCase();

    // When
    const category = await useCase.execute(createCategoryDTO);

    // Then
    expect(category.id).toBeTruthy();
    expect(category.name).toBe(createCategoryDTO.name);
  });

  it('should not be able to create a new category when name already exists', async () => {
    // Given
    const useCase = createInstanceOfUseCase();
    await useCase.execute(createCategoryDTO);
    const expectedResult = new AppError(
      CreateCategoryEnum.CATEGORY_ALREADY_EXISTS_ERROR,
    );

    // When
    const execution = async () => {
      await useCase.execute(createCategoryDTO);
    };

    // Then
    expect(execution).rejects.toEqual(expectedResult);
  });
});

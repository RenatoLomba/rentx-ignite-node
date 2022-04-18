import 'reflect-metadata';
import { AppError } from '@application/shared/errors/AppError';
import { ICreateCarDTO } from '@domain/dtos/cars/ICreateCarDTO';
import { CreateCarEnum } from '@domain/enums/cars/CreateCarEnum';
import { CarsRepositoryInMemory } from '@infra/repositories/implementations/cars/in-memory/CarsRepositoryInMemory';

import { CreateCarUseCase } from './CreateCarUseCase';

const createDto = (): ICreateCarDTO => {
  return {
    name: 'test-name',
    description: 'test-description',
    brand: 'test-brand',
    category_id: 'test-category',
    daily_rate: 100,
    fine_amount: 300,
    license_plate: 'ABC-1234',
  };
};

const createInstance = (): CreateCarUseCase => {
  const carsRepository = new CarsRepositoryInMemory();

  return new CreateCarUseCase(carsRepository);
};

describe('Create Car', () => {
  it('should be able to create a new car', async () => {
    // Given
    const createCarDto: ICreateCarDTO = createDto();
    const createCarUseCase: CreateCarUseCase = createInstance();

    // When
    const car = await createCarUseCase.execute(createCarDto);

    // Then
    expect(car.id).toBeTruthy();
  });

  it('should not be able to create a car with existent license plate', async () => {
    // Given
    const createCarDto: ICreateCarDTO = createDto();
    const createCarUseCase: CreateCarUseCase = createInstance();
    await createCarUseCase.execute(createCarDto);
    const expectedResult = new AppError(CreateCarEnum.CAR_ALREADY_EXISTS_ERROR);

    // When
    const createCarExecution = async () => {
      await createCarUseCase.execute(createCarDto);
    };

    // Then
    expect(createCarExecution).rejects.toEqual(expectedResult);
  });

  it('should be able to create a car with available true by default', async () => {
    // Given
    const createCarDto: ICreateCarDTO = createDto();
    const createCarUseCase: CreateCarUseCase = createInstance();

    // When
    const car = await createCarUseCase.execute(createCarDto);

    // Then
    expect(car.available).toBe(true);
  });
});

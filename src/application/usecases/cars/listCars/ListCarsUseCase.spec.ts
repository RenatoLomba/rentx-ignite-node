import 'reflect-metadata';
import { ICreateCarDTO } from '@domain/dtos/cars/ICreateCarDTO';
import { ICar } from '@domain/entities/cars/ICar';
import { CarsRepositoryInMemory } from '@infra/repositories/implementations/cars/in-memory/CarsRepositoryInMemory';
import { ICarsRepository } from '@infra/repositories/interface/cars/ICarsRepository';

import { CreateCarUseCase } from '../createCar/CreateCarUseCase';
import { ListCarsUseCase } from './ListCarsUseCase';

const createData = async (createCarUseCase: CreateCarUseCase) => {
  const cars: ICreateCarDTO[] = [
    {
      brand: 'test-brand',
      category_id: 'test-category',
      daily_rate: 100,
      description: 'test-description',
      fine_amount: 400,
      license_plate: 'test-license',
      name: 'test-name',
    },
    {
      brand: 'test-brand-2',
      category_id: 'test-category-2',
      daily_rate: 100,
      description: 'test-description-2',
      fine_amount: 400,
      license_plate: 'test-license-2',
      name: 'test-name-2',
    },
  ];

  await Promise.all(
    cars.map((car) => {
      return new Promise<ICar>((resolve) => {
        createCarUseCase.execute(car).then((createdCar) => resolve(createdCar));
      });
    }),
  );
};

const createInstance = async () => {
  const carsRepository: ICarsRepository = new CarsRepositoryInMemory();

  const createCarUseCase = new CreateCarUseCase(carsRepository);
  const listCarsUseCase = new ListCarsUseCase(carsRepository);

  await createData(createCarUseCase);

  return listCarsUseCase;
};

describe('List Cars', () => {
  it('should be able to list all available cars', async () => {
    // Given
    const listCarsUseCase = await createInstance();

    // When
    const cars = await listCarsUseCase.execute({});

    // Then
    expect(cars.length).toBe(2);
  });

  it('should be able to list all available cars filtered by name', async () => {
    // Given
    const listCarsUseCase = await createInstance();

    // When
    const cars = await listCarsUseCase.execute({ carName: 'test-name' });

    // Then
    expect(cars.length).toBe(1);
  });

  it('should be able to list all available cars filtered by brand', async () => {
    // Given
    const listCarsUseCase = await createInstance();

    // When
    const cars = await listCarsUseCase.execute({ carBrand: 'test-brand-2' });

    // Then
    expect(cars.length).toBe(1);
  });

  it('should be able to list all available cars filtered by category', async () => {
    // Given
    const listCarsUseCase = await createInstance();

    // When
    const cars = await listCarsUseCase.execute({ categoryId: 'test-category' });

    // Then
    expect(cars.length).toBe(1);
  });
});

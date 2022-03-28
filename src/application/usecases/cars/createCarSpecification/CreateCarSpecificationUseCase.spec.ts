import 'reflect-metadata';
import { ICreateCarDTO } from '../../../../domain/dtos/cars/ICreateCarDTO';
import { ICreateCarSpecificationDTO } from '../../../../domain/dtos/cars/ICreateCarSpecificationDTO';
import { ICreateSpecificationDTO } from '../../../../domain/dtos/cars/ICreateSpecificationDTO';
import { ICar } from '../../../../domain/entities/cars/ICar';
import { ISpecification } from '../../../../domain/entities/cars/ISpecification';
import { CarsRepositoryInMemory } from '../../../../infra/repositories/implementations/cars/in-memory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '../../../../infra/repositories/implementations/cars/in-memory/SpecificationsRepositoryInMemory';
import { ICarsRepository } from '../../../../infra/repositories/interface/cars/ICarsRepository';
import { ISpecificationsRepository } from '../../../../infra/repositories/interface/cars/ISpecificationsReposity';
import { AppError } from '../../../shared/errors/AppError';
import { CreateCarUseCase } from '../createCar/CreateCarUseCase';
import { CreateSpecificationUseCase } from '../createSpecification/CreateSpecificationUseCase';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

const createCars = async (repository: ICarsRepository): Promise<ICar[]> => {
  const createCarUseCase = new CreateCarUseCase(repository);

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

  const carsCreated = await Promise.all(
    cars.map((car) => {
      return new Promise<ICar>((resolve) => {
        createCarUseCase.execute(car).then((createdCar) => resolve(createdCar));
      });
    }),
  );

  return carsCreated;
};

const createSpecifications = async (
  repository: ISpecificationsRepository,
): Promise<ISpecification[]> => {
  const createSpecificationUseCase = new CreateSpecificationUseCase(repository);

  const specifications: ICreateSpecificationDTO[] = [
    { description: 'test-description', name: 'test-name' },
    { description: 'test-description-2', name: 'test-name-2' },
  ];

  const specificationsCreated = await Promise.all(
    specifications.map((sp) => {
      return new Promise<ISpecification>((resolve) => {
        createSpecificationUseCase
          .execute(sp)
          .then((createdSp) => resolve(createdSp));
      });
    }),
  );

  return specificationsCreated;
};

const createInstance = (
  carsRepository: ICarsRepository,
  specificationsRepository: ISpecificationsRepository,
): CreateCarSpecificationUseCase => {
  return new CreateCarSpecificationUseCase(
    carsRepository,
    specificationsRepository,
  );
};

describe('Create a Car Specification', () => {
  it('Should be able to add a new specification to the car', async () => {
    // Given
    const carsRepository = new CarsRepositoryInMemory();
    const specificationsRepository = new SpecificationsRepositoryInMemory();

    const [car] = await createCars(carsRepository);
    const [sp1, sp2] = await createSpecifications(specificationsRepository);

    const useCase = createInstance(carsRepository, specificationsRepository);
    const dto: ICreateCarSpecificationDTO = {
      car_id: car.id,
      specifications_ids: [sp1.id, sp2.id],
    };

    // When
    const resultCar = await useCase.execute(dto);

    // Then
    expect(resultCar.specifications.length).toBe(2);
    expect(resultCar.specifications.includes(sp1)).toBe(true);
    expect(resultCar.specifications.includes(sp2)).toBe(true);
  });

  it('Should not be able to add a new specification to a car that does not exist', async () => {
    // Given
    const carsRepository = new CarsRepositoryInMemory();
    const specificationsRepository = new SpecificationsRepositoryInMemory();
    const useCase = createInstance(carsRepository, specificationsRepository);
    const dto: ICreateCarSpecificationDTO = {
      car_id: '123',
      specifications_ids: ['456'],
    };

    // When
    const execution = async () => {
      await useCase.execute(dto);
    };

    // Then
    expect(execution).rejects.toBeInstanceOf(AppError);
  });
});

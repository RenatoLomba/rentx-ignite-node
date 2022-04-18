import { plainToClass } from 'class-transformer';
import faker from 'faker';
import 'reflect-metadata';

import { CreateRentalDTO } from '@domain/dtos/rentals/CreateRentalDTO';
import { Rental } from '@domain/entities/rentals/Rental';
import { CreateRentalEnum } from '@domain/enums/rentals/CreateRentalEnum';
import { CarsRepositoryInMemory } from '@infra/repositories/implementations/cars/in-memory/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '@infra/repositories/implementations/rentals/in-memory/RentalsRepositoryInMemory';
import { IRentalsRepository } from '@infra/repositories/interface/rentals/IRentalsRepository';

import { AppError } from '../../../shared/errors/AppError';
import { CreateRentalUseCase } from './CreateRentalUseCase';

const createInstance = (
  rentalsRepository: IRentalsRepository,
): CreateRentalUseCase => {
  const carsRepository = new CarsRepositoryInMemory();
  return new CreateRentalUseCase(rentalsRepository, carsRepository);
};

describe('Create a Rental', () => {
  it('Should be able to create a rental of car for user', async () => {
    // Given
    const rentalsRepository = new RentalsRepositoryInMemory();
    const useCase = createInstance(rentalsRepository);
    const dto = plainToClass(CreateRentalDTO, {
      user_id: faker.datatype.uuid(),
      car_id: faker.datatype.uuid(),
      start_date: new Date('2022-03-30 11:00:00'),
      expected_return_date: new Date('2022-03-31 11:00:00'),
    });

    // When
    const result = await useCase.execute(dto);

    // Then
    expect(result.id).toBeTruthy();
    expect(result.isFinished()).toBe(false);
  });

  it('Should not be able to create rental if car is already rented', async () => {
    // Given
    const rentalsRepository = new RentalsRepositoryInMemory();
    const useCase = createInstance(rentalsRepository);
    const dto = plainToClass(CreateRentalDTO, {
      user_id: faker.datatype.uuid(),
      car_id: faker.datatype.uuid(),
      start_date: new Date('2022-03-30'),
      expected_return_date: new Date('2022-03-31'),
    });
    await rentalsRepository.create(
      plainToClass(Rental, { ...dto, user_id: faker.datatype.uuid() }),
    );
    const expectedResult = new AppError(
      CreateRentalEnum.CAR_IS_UNAVAILABLE_ERROR,
    );

    // When
    const execution = async () => {
      await useCase.execute(dto);
    };

    // Then
    expect(execution).rejects.toEqual(expectedResult);
  });

  it('Should not be able to create rental if user has an open rent', async () => {
    // Given
    const rentalsRepository = new RentalsRepositoryInMemory();
    const useCase = createInstance(rentalsRepository);
    const dto = plainToClass(CreateRentalDTO, {
      user_id: faker.datatype.uuid(),
      car_id: faker.datatype.uuid(),
      start_date: new Date('2022-03-30'),
      expected_return_date: new Date('2022-03-31'),
    });
    await rentalsRepository.create(
      plainToClass(Rental, { ...dto, car_id: faker.datatype.uuid() }),
    );
    const expectedResult = new AppError(
      CreateRentalEnum.USER_ALREADY_HAS_AN_UNFINISHED_RENT_ERROR,
    );

    // When
    const execution = async () => {
      await useCase.execute(dto);
    };

    // Then
    expect(execution).rejects.toEqual(expectedResult);
  });

  it('Should not be able to create rental if does not have a minimum of 24 hours to return', async () => {
    // Given
    const rentalsRepository = new RentalsRepositoryInMemory();
    const useCase = createInstance(rentalsRepository);
    const dto = plainToClass(CreateRentalDTO, {
      user_id: faker.datatype.uuid(),
      car_id: faker.datatype.uuid(),
      start_date: new Date('2022-03-30 11:00:00'),
      expected_return_date: new Date('2022-03-31 10:00:00'),
    });
    const expectedResult = new AppError(
      CreateRentalEnum.MINIMUM_HOURS_TO_RETURN_ERROR,
    );

    // When
    const execution = async () => {
      await useCase.execute(dto);
    };

    // Then
    expect(execution).rejects.toEqual(expectedResult);
  });
});

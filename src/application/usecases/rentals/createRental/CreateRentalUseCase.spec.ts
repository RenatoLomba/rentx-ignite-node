import { plainToClass } from 'class-transformer';
import faker from 'faker';
import 'reflect-metadata';

import { CreateRentalDTO } from '@domain/dtos/rentals/CreateRentalDTO';
import { Rental } from '@domain/entities/rentals/Rental';
import { RentalsRepositoryInMemory } from '@infra/repositories/implementations/rentals/in-memory/RentalsRepositoryInMemory';
import { IRentalsRepository } from '@infra/repositories/interface/rentals/IRentalsRepository';

import { AppError } from '../../../shared/errors/AppError';
import { CreateRentalUseCase } from './CreateRentalUseCase';

const createInstance = (
  rentalsRepository: IRentalsRepository,
): CreateRentalUseCase => {
  return new CreateRentalUseCase(rentalsRepository);
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

    // When
    const execution = async () => {
      await useCase.execute(dto);
    };

    // Then
    expect(execution).rejects.toBeInstanceOf(AppError);
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

    // When
    const execution = async () => {
      await useCase.execute(dto);
    };

    // Then
    expect(execution).rejects.toBeInstanceOf(AppError);
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

    // When
    const execution = async () => {
      await useCase.execute(dto);
    };

    // Then
    expect(execution).rejects.toBeInstanceOf(AppError);
  });
});

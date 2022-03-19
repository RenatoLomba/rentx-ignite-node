import { container } from 'tsyringe';

import { UsersRepository } from '@infra/repositories/implementations/accounts/typeorm/UsersRepository';
import { CarsRepository } from '@infra/repositories/implementations/cars/typeorm/CarsRepository';
import { CategoriesRepository } from '@infra/repositories/implementations/cars/typeorm/CategoriesRepository';
import { SpecificationsRepository } from '@infra/repositories/implementations/cars/typeorm/SpecificationsRepository';
import { IUsersRepository } from '@infra/repositories/interface/accounts/IUsersRepository';
import { ICarsRepository } from '@infra/repositories/interface/cars/ICarsRepository';
import { ICategoriesRepository } from '@infra/repositories/interface/cars/ICategoriesRepository';
import { ISpecificationsRepository } from '@infra/repositories/interface/cars/ISpecificationsReposity';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);

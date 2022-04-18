import { ICreateCarDTO } from '@domain/dtos/cars/ICreateCarDTO';
import { IListCarsFilters } from '@domain/dtos/cars/IListCarsFilters';
import { ICar } from '@domain/entities/cars/ICar';

import { ISpecification } from '../../../../domain/entities/cars/ISpecification';

export interface ICarsRepository {
  findById(carId: string): Promise<ICar>;
  findByIdWithImages(carId: string): Promise<ICar>;
  create(dto: ICreateCarDTO): Promise<ICar>;
  findByLicensePlate(license_plate: string): Promise<ICar>;
  findAvailable(filters: IListCarsFilters): Promise<ICar[]>;
  addSpecifications(
    carId: string,
    specifications: ISpecification[],
  ): Promise<ICar>;
  updateAvailable(carId: string, available?: boolean): Promise<void>;
}

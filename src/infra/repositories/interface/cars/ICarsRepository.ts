import { ICreateCarDTO } from '@domain/dtos/cars/ICreateCarDTO';
import { IListCarsFilters } from '@domain/dtos/cars/IListCarsFilters';
import { ICar } from '@domain/entities/cars/ICar';

export interface ICarsRepository {
  create(dto: ICreateCarDTO): Promise<ICar>;
  findByLicensePlate(license_plate: string): Promise<ICar>;
  findAvailable(filters: IListCarsFilters): Promise<ICar[]>;
}

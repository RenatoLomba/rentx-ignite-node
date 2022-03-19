import { ICreateCarDTO } from '@domain/dtos/cars/ICreateCarDTO';
import { ICar } from '@domain/entities/cars/ICar';

export interface ICarsRepository {
  create(dto: ICreateCarDTO): Promise<ICar>;
  findByLicensePlate(license_plate: string): Promise<ICar>;
}

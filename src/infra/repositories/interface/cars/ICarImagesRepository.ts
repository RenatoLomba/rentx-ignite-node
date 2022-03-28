import { ICreateCarImageDTO } from '../../../../domain/dtos/cars/ICreateCarImageDTO';
import { ICarImage } from '../../../../domain/entities/cars/ICarImage';

export interface ICarImagesRepository {
  create(dto: ICreateCarImageDTO): Promise<ICarImage>;
  deleteAll(carId: string): Promise<void>;
}

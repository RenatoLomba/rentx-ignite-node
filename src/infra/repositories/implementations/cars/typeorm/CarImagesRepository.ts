import { CarImage } from '@infra/entities/cars/typeorm/CarImage';

import { ICarImagesRepository } from '../../../interface/cars/ICarImagesRepository';
import { Repository } from '../../../TypeormRepository';

export class CarImagesRepository
  extends Repository<CarImage>
  implements ICarImagesRepository
{
  constructor() {
    super(CarImage);
  }

  async deleteAll(carId: string): Promise<void> {
    await this.repository.delete({ car_id: carId });
  }
}

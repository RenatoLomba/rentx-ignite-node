import { inject, injectable } from 'tsyringe';

import { IUploadCarImagesDTO } from '@domain/dtos/cars/IUploadCarImagesDTO';
import { ICarImage } from '@domain/entities/cars/ICarImage';
import { UploadCarImageEnum } from '@domain/enums/cars/UploadCarImageEnum';
import { ICarImagesRepository } from '@infra/repositories/interface/cars/ICarImagesRepository';
import { ICarsRepository } from '@infra/repositories/interface/cars/ICarsRepository';

import { AppError } from '../../../shared/errors/AppError';
import { IStorageProvider } from '../../../shared/providers/StorageProvider/IStorageProvider';
import { IUseCase } from '../../IUseCase';

@injectable()
export class UploadCarImageUseCase implements IUseCase {
  constructor(
    @inject('CarImagesRepository')
    private readonly carImagesRepository: ICarImagesRepository,

    @inject('CarsRepository')
    private readonly carsRepository: ICarsRepository,

    @inject('StorageProvider')
    private readonly storageProvider: IStorageProvider,
  ) {}

  async execute(dto: IUploadCarImagesDTO): Promise<ICarImage[]> {
    const car = await this.carsRepository.findByIdWithImages(dto.car_id);

    if (!car) {
      throw new AppError(UploadCarImageEnum.CAR_NOT_FOUND_ERROR);
    }

    if (car.images && car.images.length > 0) {
      await this.carImagesRepository.deleteAll(car.id);

      await Promise.all(
        car.images.map(async (ci) => {
          await this.storageProvider.delete(ci.image_name, 'cars');
        }),
      );
    }

    const carImages = await Promise.all(
      dto.images_names.map(async (imgName) => {
        const imageCreated = await this.carImagesRepository.create({
          car_id: car.id,
          image_name: imgName,
        });

        await this.storageProvider.save(imgName, 'cars');

        return imageCreated;
      }),
    );

    return carImages;
  }
}

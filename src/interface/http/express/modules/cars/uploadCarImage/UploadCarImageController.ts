import { Request, Response } from 'express';

import { UploadCarImageUseCase } from '@application/usecases/cars/uploadCarImage/UploadCarImageUseCase';

import { BaseController } from '../../BaseController';

export class UploadCarImageController extends BaseController<UploadCarImageUseCase> {
  constructor() {
    super(UploadCarImageUseCase);
  }

  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as unknown as Express.Multer.File[];

    const images_names = images.map((i) => i.filename);

    const carImages = await this.useCase.execute({ car_id: id, images_names });

    return response.status(201).json({ car: { id, images: carImages } });
  }
}

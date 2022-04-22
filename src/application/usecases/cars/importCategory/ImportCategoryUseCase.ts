import { parse as csvParse } from 'csv-parse';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';

import { IUseCase } from '@application/usecases/IUseCase';
import { ICreateCategoryDTO } from '@domain/dtos/cars/ICreateCategoryDTO';
import { ICategoriesRepository } from '@infra/repositories/interface/cars/ICategoriesRepository';

import { deleteFile } from '../../../shared/utils/file';

@injectable()
export class ImportCategoryUseCase implements IUseCase {
  constructor(
    @inject('CategoriesRepository')
    private readonly categoriesRepository: ICategoriesRepository,
  ) {}

  loadCategories(file: Express.Multer.File): Promise<ICreateCategoryDTO[]> {
    return new Promise<ICreateCategoryDTO[]>((resolve, reject) => {
      const stream = fs.createReadStream(file.path);

      const categories: ICreateCategoryDTO[] = [];

      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile
        .on('data', async ([name, description]: string[]) => {
          categories.push({ description, name });
        })
        .on('end', async () => {
          await deleteFile(file.path);
          resolve(categories);
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File) {
    const categories = await this.loadCategories(file);

    const createdCategories = await Promise.all(
      categories.map(async ({ description, name }) => {
        let category = await this.categoriesRepository.findByName(name);

        if (!category) {
          category = await this.categoriesRepository.create({
            description,
            name,
          });
        }

        return category;
      }),
    );

    return createdCategories;
  }
}

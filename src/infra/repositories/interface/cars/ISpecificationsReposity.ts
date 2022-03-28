import { ICreateSpecificationDTO } from '@domain/dtos/cars/ICreateSpecificationDTO';
import { ISpecification } from '@domain/entities/cars/ISpecification';

export interface ISpecificationsRepository {
  create(
    createSpecificationDTO: ICreateSpecificationDTO,
  ): Promise<ISpecification>;
  findByName(name: string): Promise<ISpecification>;
  findByIds(idList: string[]): Promise<ISpecification[]>;
}

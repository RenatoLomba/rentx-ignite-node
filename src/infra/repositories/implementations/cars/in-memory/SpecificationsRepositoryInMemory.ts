import { ICreateSpecificationDTO } from '../../../../../domain/dtos/cars/ICreateSpecificationDTO';
import { ISpecification } from '../../../../../domain/entities/cars/ISpecification';
import { Specification } from '../../../../entities/cars/model/Specification';
import { ISpecificationsRepository } from '../../../interface/cars/ISpecificationsReposity';

export class SpecificationsRepositoryInMemory
  implements ISpecificationsRepository
{
  private readonly specifications: ISpecification[] = [];

  async create(
    createSpecificationDTO: ICreateSpecificationDTO,
  ): Promise<ISpecification> {
    const specification = new Specification();

    Object.assign(specification, {
      ...createSpecificationDTO,
      created_at: new Date(),
    });

    this.specifications.push(specification);

    return specification;
  }

  async findByName(name: string): Promise<ISpecification> {
    return this.specifications.find((sp) => sp.name === name);
  }

  async findByIds(idList: string[]): Promise<ISpecification[]> {
    return this.specifications.filter((sp) => idList.includes(sp.id));
  }
}

import { Specification } from '@infra/entities/cars/typeorm/Specification';
import { ISpecificationsRepository } from '@infra/repositories/interface/cars/ISpecificationsReposity';
import { Repository } from '@infra/repositories/TypeormRepository';

import { ISpecification } from '../../../../../domain/entities/cars/ISpecification';

export class SpecificationsRepository
  extends Repository<Specification>
  implements ISpecificationsRepository
{
  constructor() {
    super(Specification);
  }

  async findByIds(idList: string[]): Promise<ISpecification[]> {
    return this.repository.findByIds(idList);
  }

  async findByName(name: string): Promise<Specification> {
    return this.repository.findOne({ name });
  }
}

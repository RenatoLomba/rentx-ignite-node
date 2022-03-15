import { Specification } from '@infra/entities/cars/typeorm/Specification';
import { ISpecificationsRepository } from '@infra/repositories/interface/cars/ISpecificationsReposity';
import { Repository } from '@infra/repositories/TypeormRepository';

export class SpecificationsRepository
  extends Repository<Specification>
  implements ISpecificationsRepository
{
  constructor() {
    super(Specification);
  }

  async findByName(name: string): Promise<Specification> {
    return this.repository.findOne({ name });
  }
}

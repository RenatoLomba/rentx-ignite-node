import { Category } from '@infra/entities/cars/typeorm/Category';
import { ICategoriesRepository } from '@infra/repositories/interface/cars/ICategoriesRepository';
import { Repository } from '@infra/repositories/TypeormRepository';

class CategoriesRepository
  extends Repository<Category>
  implements ICategoriesRepository
{
  constructor() {
    super(Category);
  }

  async findByName(name: string): Promise<Category> {
    return this.repository.findOne({ name });
  }
}

export { CategoriesRepository };

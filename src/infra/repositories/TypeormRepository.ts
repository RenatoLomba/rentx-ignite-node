import {
  DeepPartial,
  EntityTarget,
  getRepository,
  Repository as TypeORMRepository,
} from 'typeorm';

abstract class Repository<T> {
  protected readonly repository: TypeORMRepository<T>;

  constructor(entity: EntityTarget<T>) {
    this.repository = getRepository(entity);
  }

  async findById(id: string): Promise<T> {
    const entity = await this.repository.findOne(id);

    return entity;
  }

  async create(dto: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create({ ...dto });

    await this.repository.save(entity as DeepPartial<T>);

    return entity;
  }

  async list(): Promise<T[]> {
    return this.repository.find();
  }
}

export { Repository };

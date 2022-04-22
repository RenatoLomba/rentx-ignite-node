import { User } from '@infra/entities/accounts/typeorm/User';
import { IUsersRepository } from '@infra/repositories/interface/accounts/IUsersRepository';
import { Repository } from '@infra/repositories/TypeormRepository';

class UsersRepository extends Repository<User> implements IUsersRepository {
  constructor() {
    super(User);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });

    return user;
  }
}

export { UsersRepository };

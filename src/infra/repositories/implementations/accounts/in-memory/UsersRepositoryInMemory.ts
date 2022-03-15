import { ICreateUserDTO } from '@domain/dtos/accounts/ICreateUserDTO';
import { User } from '@infra/entities/accounts/model/User';
import { IUsersRepository } from '@infra/repositories/interface/accounts/IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = [];

  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }

  async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { ...data, created_at: new Date() });

    this.users.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }
}

export { UsersRepositoryInMemory };

import { ICreateUserDTO } from '@domain/dtos/accounts/ICreateUserDTO';
import { IUser } from '@domain/entities/accounts/IUser';

interface IUsersRepository {
  findById(id: string): Promise<IUser>;
  create(data: ICreateUserDTO): Promise<IUser>;
  findByEmail(email: string): Promise<IUser>;
}

export { IUsersRepository };

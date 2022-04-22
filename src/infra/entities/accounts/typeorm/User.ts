import { plainToInstance } from 'class-transformer';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { UserResponseDTO } from '@domain/dtos/accounts/UserResponseDTO';
import { IUser } from '@domain/entities/accounts/IUser';

@Entity('users')
class User implements IUser {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  driver_license: string;

  @Column('boolean', { default: false })
  isAdmin: boolean;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  static toDomain(user: User): UserResponseDTO {
    return plainToInstance(UserResponseDTO, user, {
      excludeExtraneousValues: true,
    });
  }

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { User };

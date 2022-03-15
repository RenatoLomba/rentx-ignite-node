import { v4 as uuid } from 'uuid';

import { IUser } from '@domain/entities/accounts/IUser';

class User implements IUser {
  id?: string;
  name: string;
  password: string;
  email: string;
  driver_license: string;
  isAdmin: boolean;
  avatar: string;
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { User };

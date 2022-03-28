import { v4 as uuid } from 'uuid';

import { ISpecification } from '../../../../domain/entities/cars/ISpecification';

export class Specification implements ISpecification {
  id?: string;
  name: string;
  description: string;
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

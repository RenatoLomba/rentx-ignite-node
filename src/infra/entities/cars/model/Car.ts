import { v4 as uuid } from 'uuid';

import { ICar } from '@domain/entities/cars/ICar';

import { ISpecification } from '../../../../domain/entities/cars/ISpecification';

export class Car implements ICar {
  id?: string;
  name: string;
  description: string;
  daily_rate: number;
  available = true;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
  specifications?: ISpecification[];
  created_at = new Date();

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

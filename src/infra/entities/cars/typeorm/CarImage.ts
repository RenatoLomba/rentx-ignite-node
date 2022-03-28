import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { ICarImage } from '@domain/entities/cars/ICarImage';

import { Car } from './Car';

@Entity('car_images')
export class CarImage implements ICarImage {
  @PrimaryColumn()
  id?: string;

  @Column()
  car_id: string;

  @ManyToOne(() => Car, (car) => car.images)
  @JoinColumn({ name: 'car_id' })
  car: Car;

  @Column()
  image_name: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

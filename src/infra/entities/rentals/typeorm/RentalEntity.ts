import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('rentals')
export class RentalEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  user_id: string;

  @Column()
  car_id: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  expected_return_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  total: number;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

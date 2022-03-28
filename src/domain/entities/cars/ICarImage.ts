import { ICar } from './ICar';

export interface ICarImage {
  id?: string;
  car_id: string;
  car?: ICar;
  image_name: string;
  created_at: Date;
}

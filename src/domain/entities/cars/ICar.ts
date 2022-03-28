import { ICarImage } from './ICarImage';
import { ISpecification } from './ISpecification';

export interface ICar {
  id?: string;
  name: string;
  description: string;
  daily_rate: number;
  available: boolean;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
  specifications?: ISpecification[];
  images?: ICarImage[];
  created_at: Date;
}

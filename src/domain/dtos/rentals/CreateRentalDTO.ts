import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { DTO } from '../DTO';

export class CreateRentalDTO extends DTO {
  @IsUUID('4', { message: '"user_id" must be an uuid' })
  @IsString({ message: '"user_id" must be of type string' })
  @IsNotEmpty({ message: '"user_id" is required' })
  user_id: string;

  @IsUUID('4', { message: '"car_id" must be an uuid' })
  @IsString({ message: '"car_id" must be of type string' })
  @IsNotEmpty({ message: '"car_id" is required' })
  car_id: string;

  @IsDate({ message: '"start_date" must be of type Date' })
  @IsOptional()
  start_date?: Date;

  @IsDate({ message: '"expected_return_date" must be of type Date' })
  expected_return_date: Date;
}

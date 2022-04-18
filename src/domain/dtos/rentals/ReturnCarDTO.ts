import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

import { DTO } from '../DTO';

export class ReturnCarDTO extends DTO {
  @IsUUID('4', { message: '"rental_id" must be an uuid' })
  @IsString({ message: '"rental_id" must be of type string' })
  @IsNotEmpty({ message: '"rental_id" is required' })
  rental_id: string;

  @IsUUID('4', { message: '"user_id" must be an uuid' })
  @IsString({ message: '"user_id" must be of type string' })
  @IsNotEmpty({ message: '"user_id" is required' })
  user_id: string;
}

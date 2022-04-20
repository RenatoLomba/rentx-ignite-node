import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

import { DTO } from '../DTO';

export class ResetUserPasswordDTO extends DTO {
  @IsUUID('4', { message: '"token" must be an uuid' })
  @IsString({ message: '"token" must be of type string' })
  @IsNotEmpty({ message: '"token" is required' })
  token: string;

  @IsString({ message: '"password" must be of type string' })
  @IsNotEmpty({ message: '"password" is required' })
  password: string;
}

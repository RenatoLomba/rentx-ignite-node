import { instanceToPlain } from 'class-transformer';

import { UserResponseDTO } from '@domain/dtos/accounts/UserResponseDTO';

export class UserMap {
  static toDTO(user: UserResponseDTO) {
    return instanceToPlain(user, { excludeExtraneousValues: true });
  }
}

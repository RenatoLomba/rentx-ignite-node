import { inject, injectable } from 'tsyringe';

import { deleteFile } from '@application/shared/utils/file';
import { IUseCase } from '@application/usecases/IUseCase';
import { IUpdateUserAvatarDTO } from '@domain/dtos/accounts/IUpdateUserAvatarDTO';
import { IUsersRepository } from '@infra/repositories/interface/accounts/IUsersRepository';

@injectable()
class UpdateUserAvatarUseCase implements IUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute({ avatar_file, user_id }: IUpdateUserAvatarDTO) {
    const user = await this.usersRepository.findById(user_id);

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    user.avatar = avatar_file;

    const userUpdated = await this.usersRepository.create(user);

    return userUpdated;
  }
}

export { UpdateUserAvatarUseCase };

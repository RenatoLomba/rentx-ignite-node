import { inject, injectable } from 'tsyringe';

import { IUseCase } from '@application/usecases/IUseCase';
import { IUpdateUserAvatarDTO } from '@domain/dtos/accounts/IUpdateUserAvatarDTO';
import { IUsersRepository } from '@infra/repositories/interface/accounts/IUsersRepository';

import { IStorageProvider } from '../../../shared/providers/StorageProvider/IStorageProvider';

@injectable()
class UpdateUserAvatarUseCase implements IUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
    @inject('StorageProvider')
    private readonly storageProvider: IStorageProvider,
  ) {}

  async execute({ avatar_file, user_id }: IUpdateUserAvatarDTO) {
    const user = await this.usersRepository.findById(user_id);

    if (user.avatar) {
      await this.storageProvider.delete(user.avatar, 'avatar');
    }

    await this.storageProvider.save(avatar_file, 'avatar');

    user.avatar = avatar_file;

    const userUpdated = await this.usersRepository.create(user);

    return userUpdated;
  }
}

export { UpdateUserAvatarUseCase };

import { Router } from 'express';

import { createUserRouter } from '../modules/accounts/createUser/CreateUserRouter';
import { profileUserRouter } from '../modules/accounts/profileUser/ProfileUserRouter';
import { updateUserAvatarRouter } from '../modules/accounts/updateUserAvatar/UpdateUserAvatarRouter';

const usersRoutes = Router();

usersRoutes.use(createUserRouter);
usersRoutes.use(updateUserAvatarRouter);
usersRoutes.use(profileUserRouter);

export { usersRoutes };

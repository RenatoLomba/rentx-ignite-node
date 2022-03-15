import { Router } from 'express';

import { createUserRouter } from '../modules/accounts/createUser/CreateUserRouter';
import { updateUserAvatarRouter } from '../modules/accounts/updateUserAvatar/UpdateUserAvatarRouter';

const usersRoutes = Router();

usersRoutes.use(createUserRouter);
usersRoutes.use(updateUserAvatarRouter);

export { usersRoutes };

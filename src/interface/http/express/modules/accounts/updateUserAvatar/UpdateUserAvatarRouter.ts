import { Router } from 'express';
import multer from 'multer';

import upload from '@application/shared/libs/multer/upload';
import { ensureAuthenticated } from '@interface/http/express/middlewares/ensureAuthenticated';

import { UpdateUserAvatarController } from './UpdateUserAvatarController';

const updateUserAvatarRouter = Router();

const uploadAvatar = multer(upload);

updateUserAvatarRouter.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  (req, res) => {
    const updateUserAvatarController = new UpdateUserAvatarController();
    return updateUserAvatarController.handle(req, res);
  },
);

export { updateUserAvatarRouter };

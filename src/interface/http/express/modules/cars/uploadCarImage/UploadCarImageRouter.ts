import { Router } from 'express';
import multer from 'multer';

import upload from '@application/shared/libs/multer/upload';

import { ensureAdmin } from '../../../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../../../middlewares/ensureAuthenticated';
import { UploadCarImageController } from './UploadCarImageController';

const uploadCarImageRouter = Router();

const uploadCarImages = multer(upload);

uploadCarImageRouter.post(
  '/:id/images',
  ensureAuthenticated,
  ensureAdmin,
  uploadCarImages.array('images'),
  (req, res) => {
    const uploadCarImageController = new UploadCarImageController();

    return uploadCarImageController.handle(req, res);
  },
);

export { uploadCarImageRouter };

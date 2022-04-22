import { Router } from 'express';
import multer from 'multer';

import upload from '@application/shared/libs/multer/upload';
import { ensureAdmin } from '@interface/http/express/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@interface/http/express/middlewares/ensureAuthenticated';

import { ImportCategoryController } from './ImportCategoryController';

const importCategoryRouter = Router();

const uploadCsv = multer(upload);

importCategoryRouter.post(
  '/import',
  ensureAuthenticated,
  ensureAdmin,
  uploadCsv.single('file'),
  (req, res) => {
    const importCategoryController = new ImportCategoryController();
    return importCategoryController.handle(req, res);
  },
);

export { importCategoryRouter };

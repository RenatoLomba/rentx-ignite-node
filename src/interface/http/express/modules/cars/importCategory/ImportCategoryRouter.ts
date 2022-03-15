import { Router } from 'express';
import multer from 'multer';

import upload from '@application/shared/libs/multer/upload';
import { ensureAuthenticated } from '@interface/http/express/middlewares/ensureAuthenticated';

import { ImportCategoryController } from './ImportCategoryController';

const importCategoryRouter = Router();

const uploadCsv = multer(upload('./tmp'));

importCategoryRouter.post(
  '/import',
  ensureAuthenticated,
  uploadCsv.single('file'),
  (req, res) => {
    const importCategoryController = new ImportCategoryController();
    return importCategoryController.handle(req, res);
  },
);

export { importCategoryRouter };

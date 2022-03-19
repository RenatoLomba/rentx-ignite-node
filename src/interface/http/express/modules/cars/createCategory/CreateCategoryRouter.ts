import { Router } from 'express';

import { ensureAdmin } from '@interface/http/express/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@interface/http/express/middlewares/ensureAuthenticated';

import { CreateCategoryController } from './CreateCategoryController';

const createCategoryRouter = Router();

createCategoryRouter.post('/', ensureAuthenticated, ensureAdmin, (req, res) => {
  const createCategoryController = new CreateCategoryController();
  return createCategoryController.handle(req, res);
});

export { createCategoryRouter };

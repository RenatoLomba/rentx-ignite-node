import { Router } from 'express';

import { ensureAuthenticated } from '@interface/http/express/middlewares/ensureAuthenticated';

import { CreateCategoryController } from './CreateCategoryController';

const createCategoryRouter = Router();

createCategoryRouter.post('/', ensureAuthenticated, (req, res) => {
  const createCategoryController = new CreateCategoryController();
  return createCategoryController.handle(req, res);
});

export { createCategoryRouter };

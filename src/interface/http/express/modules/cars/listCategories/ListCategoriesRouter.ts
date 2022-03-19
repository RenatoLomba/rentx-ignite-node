import { Router } from 'express';

import { ensureAdmin } from '@interface/http/express/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@interface/http/express/middlewares/ensureAuthenticated';

import { ListCategoriesController } from './ListCategoriesController';

const listCategoriesRouter = Router();

listCategoriesRouter.get('/', ensureAuthenticated, ensureAdmin, (req, res) => {
  const listCategoriesController = new ListCategoriesController();
  return listCategoriesController.handle(req, res);
});

export { listCategoriesRouter };

import { Router } from 'express';

import { ensureAuthenticated } from '@interface/http/express/middlewares/ensureAuthenticated';

import { ListCategoriesController } from './ListCategoriesController';

const listCategoriesRouter = Router();

listCategoriesRouter.get('/', ensureAuthenticated, (req, res) => {
  const listCategoriesController = new ListCategoriesController();
  return listCategoriesController.handle(req, res);
});

export { listCategoriesRouter };

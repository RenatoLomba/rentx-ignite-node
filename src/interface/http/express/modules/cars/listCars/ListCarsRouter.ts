import { Router } from 'express';

import { ensureAuthenticated } from '@interface/http/express/middlewares/ensureAuthenticated';

import { ListCarsController } from './ListCarsController';

const listCarsRouter = Router();

listCarsRouter.get('/', ensureAuthenticated, (req, res) => {
  const listCarsController = new ListCarsController();

  return listCarsController.handle(req, res);
});

export { listCarsRouter };

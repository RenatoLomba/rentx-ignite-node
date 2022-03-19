import { Router } from 'express';

import { ensureAdmin } from '@interface/http/express/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@interface/http/express/middlewares/ensureAuthenticated';

import { CreateCarController } from './CreateCarController';

const createCarRouter = Router();

createCarRouter.post('/', ensureAuthenticated, ensureAdmin, (req, res) => {
  const createCarController = new CreateCarController();

  return createCarController.handle(req, res);
});

export { createCarRouter };

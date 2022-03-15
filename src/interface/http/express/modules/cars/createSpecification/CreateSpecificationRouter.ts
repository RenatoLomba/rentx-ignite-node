import { Router } from 'express';

import { ensureAuthenticated } from '@interface/http/express/middlewares/ensureAuthenticated';

import { CreateSpecificationController } from './CreateSpecificationController';

const createSpecificationRouter = Router();

createSpecificationRouter.post('/', ensureAuthenticated, (req, res) => {
  const createSpecificationController = new CreateSpecificationController();
  return createSpecificationController.handle(req, res);
});

export { createSpecificationRouter };

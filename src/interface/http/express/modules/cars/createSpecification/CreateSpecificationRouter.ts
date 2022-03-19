import { Router } from 'express';

import { ensureAdmin } from '@interface/http/express/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@interface/http/express/middlewares/ensureAuthenticated';

import { CreateSpecificationController } from './CreateSpecificationController';

const createSpecificationRouter = Router();

createSpecificationRouter.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  (req, res) => {
    const createSpecificationController = new CreateSpecificationController();
    return createSpecificationController.handle(req, res);
  },
);

export { createSpecificationRouter };

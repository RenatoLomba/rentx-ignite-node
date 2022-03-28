import { Router } from 'express';

import { ensureAdmin } from '../../../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../../../middlewares/ensureAuthenticated';
import { CreateCarSpecificationController } from './CreateCarSpecificationController';

const createCarSpecificationRouter = Router();

createCarSpecificationRouter.put(
  '/:id/specifications',
  ensureAuthenticated,
  ensureAdmin,
  (req, res) => {
    const createCarSpecificationController =
      new CreateCarSpecificationController();

    return createCarSpecificationController.handle(req, res);
  },
);

export { createCarSpecificationRouter };

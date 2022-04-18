import { Router } from 'express';

import { ensureAuthenticated } from '../../../middlewares/ensureAuthenticated';
import { CreateRentalController } from './CreateRentalController';

const createRentalRouter = Router();

createRentalRouter.post('/', ensureAuthenticated, (req, res) => {
  const createRentalController = new CreateRentalController();
  return createRentalController.handle(req, res);
});

export { createRentalRouter };

import { Router } from 'express';

import { ensureAuthenticated } from '../../../middlewares/ensureAuthenticated';
import { ListUserRentalsController } from './ListUserRentalsController';

const listUserRentalsRouter = Router();

listUserRentalsRouter.get('/', ensureAuthenticated, (req, res) => {
  const listUserRentalsController = new ListUserRentalsController();

  return listUserRentalsController.handle(req, res);
});

export { listUserRentalsRouter };

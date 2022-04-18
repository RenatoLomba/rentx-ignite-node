import { Router } from 'express';

import { ensureAuthenticated } from '../../../middlewares/ensureAuthenticated';
import { ReturnCarController } from './ReturnCarController';

const returnCarRouter = Router();

returnCarRouter.put('/:id/return', ensureAuthenticated, (req, res) => {
  const returnCarController = new ReturnCarController();

  return returnCarController.handle(req, res);
});

export { returnCarRouter };

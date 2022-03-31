import { Router } from 'express';

import { ListCarsController } from './ListCarsController';

const listCarsRouter = Router();

listCarsRouter.get('/', (req, res) => {
  const listCarsController = new ListCarsController();

  return listCarsController.handle(req, res);
});

export { listCarsRouter };

import { Router } from 'express';

import { createCarRouter } from '../modules/cars/createCar/CreateCarRouter';

const carsRoutes = Router();

carsRoutes.use(createCarRouter);

export { carsRoutes };

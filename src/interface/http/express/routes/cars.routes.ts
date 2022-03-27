import { Router } from 'express';

import { createCarRouter } from '../modules/cars/createCar/CreateCarRouter';
import { listCarsRouter } from '../modules/cars/listCars/ListCarsRouter';

const carsRoutes = Router();

carsRoutes.use(createCarRouter);
carsRoutes.use(listCarsRouter);

export { carsRoutes };

import { Router } from 'express';

import { createCarRouter } from '../modules/cars/createCar/CreateCarRouter';
import { createCarSpecificationRouter } from '../modules/cars/createCarSpecification/CreateCarSpecificationRouter';
import { listCarsRouter } from '../modules/cars/listCars/ListCarsRouter';

const carsRoutes = Router();

carsRoutes.use(createCarRouter);
carsRoutes.use(listCarsRouter);
carsRoutes.use(createCarSpecificationRouter);

export { carsRoutes };

import { Router } from 'express';

import { createRentalRouter } from '../modules/rentals/CreateRental/CreateRentalRouter';
import { listUserRentalsRouter } from '../modules/rentals/ListUserRentals/ListUserRentalsRouter';
import { returnCarRouter } from '../modules/rentals/ReturnCar/ReturnCarRouter';

const rentalsRoutes = Router();

rentalsRoutes.use(createRentalRouter);
rentalsRoutes.use(returnCarRouter);
rentalsRoutes.use(listUserRentalsRouter);

export { rentalsRoutes };

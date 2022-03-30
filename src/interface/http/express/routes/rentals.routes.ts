import { Router } from 'express';

import { createRentalRouter } from '../modules/rentals/CreateRentalRouter';

const rentalsRoutes = Router();

rentalsRoutes.use(createRentalRouter);

export { rentalsRoutes };

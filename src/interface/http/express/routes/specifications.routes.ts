import { Router } from 'express';

import { createSpecificationRouter } from '../modules/cars/createSpecification/CreateSpecificationRouter';

const specificationsRoutes = Router();

specificationsRoutes.use(createSpecificationRouter);

export { specificationsRoutes };

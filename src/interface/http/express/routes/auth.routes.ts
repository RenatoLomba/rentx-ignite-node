import { Router } from 'express';

import { authenticateUserRouter } from '../modules/accounts/authenticateUser/AuthenticateUserRouter';

const authRoutes = Router();

authRoutes.use(authenticateUserRouter);

export { authRoutes };

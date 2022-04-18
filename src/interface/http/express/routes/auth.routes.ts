import { Router } from 'express';

import { authenticateUserRouter } from '../modules/accounts/authenticateUser/AuthenticateUserRouter';
import { refreshTokenRouter } from '../modules/accounts/refreshToken/RefreshTokenRouter';

const authRoutes = Router();

authRoutes.use(authenticateUserRouter);
authRoutes.use(refreshTokenRouter);

export { authRoutes };

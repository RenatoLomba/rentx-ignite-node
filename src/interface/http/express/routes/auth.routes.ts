import { Router } from 'express';

import { authenticateUserRouter } from '../modules/accounts/authenticateUser/AuthenticateUserRouter';
import { refreshTokenRouter } from '../modules/accounts/refreshToken/RefreshTokenRouter';
import { resetUserPasswordRouter } from '../modules/accounts/resetUserPassword/ResetUserPasswordRouter';
import { sendForgotPasswordMailRouter } from '../modules/accounts/sendForgotPasswordMail/SendForgotPasswordMailRouter';

const authRoutes = Router();

authRoutes.use(authenticateUserRouter);
authRoutes.use(refreshTokenRouter);
authRoutes.use(sendForgotPasswordMailRouter);
authRoutes.use(resetUserPasswordRouter);

export { authRoutes };

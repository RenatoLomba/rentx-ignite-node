import { Router } from 'express';

import { ResetUserPasswordController } from './ResetUserPasswordController';

const resetUserPasswordRouter = Router();

resetUserPasswordRouter.post('/reset-password', (req, res) => {
  const resetUserPasswordController = new ResetUserPasswordController();
  return resetUserPasswordController.handle(req, res);
});

export { resetUserPasswordRouter };

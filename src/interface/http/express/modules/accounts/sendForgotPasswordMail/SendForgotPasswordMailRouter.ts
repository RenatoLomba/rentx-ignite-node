import { Router } from 'express';

import { SendForgotPasswordMailController } from './SendForgotPasswordMailController';

const sendForgotPasswordMailRouter = Router();

sendForgotPasswordMailRouter.post('/forgot-password', (req, res) => {
  const sendForgotPasswordMailController =
    new SendForgotPasswordMailController();
  sendForgotPasswordMailController.handle(req, res);
});

export { sendForgotPasswordMailRouter };

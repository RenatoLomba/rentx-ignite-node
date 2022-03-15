import { Router } from 'express';

import { AuthenticateUserController } from './AuthenticateUserController';

const authenticateUserRouter = Router();

authenticateUserRouter.post('/sessions', (req, res) => {
  const authenticateUserController = new AuthenticateUserController();

  return authenticateUserController.handle(req, res);
});

export { authenticateUserRouter };

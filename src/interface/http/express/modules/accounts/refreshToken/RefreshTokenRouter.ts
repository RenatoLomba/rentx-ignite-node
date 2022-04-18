import { Router } from 'express';

import { RefreshTokenController } from './RefreshTokenController';

const refreshTokenRouter = Router();

refreshTokenRouter.post('/refresh', (req, res) => {
  const refreshTokenController = new RefreshTokenController();
  return refreshTokenController.handle(req, res);
});

export { refreshTokenRouter };

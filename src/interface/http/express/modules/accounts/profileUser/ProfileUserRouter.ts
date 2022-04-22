import { Router } from 'express';

import { ensureAuthenticated } from '../../../middlewares/ensureAuthenticated';
import { ProfileUserController } from './ProfileUserController';

const profileUserRouter = Router();

profileUserRouter.get('/me', ensureAuthenticated, (req, res) => {
  return new ProfileUserController().handle(req, res);
});

export { profileUserRouter };

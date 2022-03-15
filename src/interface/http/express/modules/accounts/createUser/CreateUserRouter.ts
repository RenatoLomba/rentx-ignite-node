import { Router } from 'express';

import { CreateUserController } from './CreateUserController';

const createUserRouter = Router();

createUserRouter.post('/', (req, res) => {
  const createUserController = new CreateUserController();
  return createUserController.handle(req, res);
});

export { createUserRouter };

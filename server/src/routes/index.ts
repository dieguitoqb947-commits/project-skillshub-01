import { Router } from 'express';
import { createUser, loginUser } from '../controllers/users.js';
import { registerLimiter, loginLimiter } from '../middleware/limiter.js';
import usersRouter from './users.js';
import offersRouter from './offers.js';

const routes = Router();

routes.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    data: { status: 'OK' },
    error: null,
  });
});

routes.post('/signup', registerLimiter, createUser);
routes.post('/signin', loginLimiter, loginUser);
routes.use('/users', usersRouter);
routes.use('/offers', offersRouter);

export default routes;

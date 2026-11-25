import { Router } from 'express';
import { getCurrentUser } from '../controllers/users.js';
import { auth } from '../middleware/auth.js';

const usersRouter = Router();

usersRouter.get('/me', auth, getCurrentUser);

export default usersRouter;
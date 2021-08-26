import { Router } from 'express';

import authMiddleware from './app/middlewares/authMiddleware';
import adminMiddleware from './app/middlewares/adminMiddleware';
import UserController from './app/controllers/UserController';
import AuthController from './app/controllers/AuthController';

const router = Router();

router.post('/users', (req, res) => UserController.store(req, res));
router.post('/auth', AuthController.authenticate);
router.get('/users', adminMiddleware, UserController.index);

export default router;

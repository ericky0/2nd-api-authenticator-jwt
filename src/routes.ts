import { Router } from 'express';

import authMiddleware from './app/middlewares/authMiddleware';
import UserController from './app/controllers/UserController';
import AuthController from './app/controllers/AuthController';
import adminMiddleware from './app/middlewares/adminMiddleware';

const router = Router();

router.post('/createuser', UserController.create);
router.post('/login', AuthController.authenticateLogin);
router.get('/listusers', adminMiddleware, UserController.listAll);
router.get('/finduser', UserController.find);
router.get('/validate', authMiddleware, UserController.index);

export default router;

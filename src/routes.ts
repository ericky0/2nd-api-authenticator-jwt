import { Router } from 'express';

import authMiddleware from './app/middlewares/authMiddleware';
import UserController from './app/controllers/UserController';
import AuthController from './app/controllers/AuthController';

const router = Router();

router.post('/createuser', UserController.create);
router.post('/login', AuthController.authenticateLogin);
router.get('/listusers', UserController.listAll);
router.get('/finduser', UserController.find);
router.get('/validate', authMiddleware, UserController.index);

export default router;

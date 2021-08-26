import { Router } from "express";

import authMiddleware from "./app/middlewares/authMiddleware";
import UserController from "./app/controllers/UserController";
import AuthController from "./app/controllers/AuthController";
import PermissionController from "./app/controllers/PermissionController";
import RoleController from "./app/controllers/RoleController";

const router = Router();

router.post('/users', UserController.store);
router.post('/auth', AuthController.authenticate);
router.post('/permissions', PermissionController.create);
router.post('/roles', RoleController.create);
router.get('/users', authMiddleware, UserController.index);

export default router;
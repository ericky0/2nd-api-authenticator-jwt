import { Router } from 'express';

import multer from 'multer';
import multerConfig from './app/config/multer';

import authMiddleware from './app/middlewares/authMiddleware';
import UserController from './app/controllers/UserController';
import AuthController from './app/controllers/AuthController';
import adminMiddleware from './app/middlewares/adminMiddleware';
import DocumentRepository from './app/repositories/DocumentRepository';
import { getCustomRepository } from 'typeorm';

const router = Router();

router.post('/createuser', UserController.create);
router.post('/login', AuthController.authenticateLogin);
router.get('/listusers', adminMiddleware, UserController.listAll);
router.get('/finduser', UserController.find);
router.get('/validate', authMiddleware, UserController.index);
router.post('/upload', multer(multerConfig).single("file"), async (req, res) => {
    const {originalname: name, size, filename: key } = req.file;
    const repository = getCustomRepository(DocumentRepository);
    const post = await repository.create({
        name,
        key,
        size,
        url: '',
        description: ''
    })

    await repository.save(post);

    return res.json(post);
})

export default router;

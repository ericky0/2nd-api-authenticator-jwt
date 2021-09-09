import { Request, Response, Router } from 'express';

import multer from 'multer';
import multerConfig from './app/config/multer';
import authMiddleware from './app/middlewares/authMiddleware';
import UserController from './app/controllers/UserController';
import AuthController from './app/controllers/AuthController';
import adminMiddleware from './app/middlewares/adminMiddleware';
import DocumentController from './app/controllers/DocumentController';
import DocumentRepository from './app/repositories/DocumentRepository';
import { getCustomRepository } from 'typeorm';

const router = Router();

router.post('/createuser', UserController.create);
router.post('/login', AuthController.authenticateLogin);
router.get('/listusers', adminMiddleware, UserController.listAll);
router.get('/finduser', UserController.find);
router.get('/validate', authMiddleware, UserController.index);
router.post('/upload', multer(multerConfig).single("file"), DocumentController.createDocument);
router.get('/listupload', DocumentController.listDocuments);
router.get('/finduploadbyid/:id', DocumentController.findDocumentsById);
router.get('/users/documents', authMiddleware, DocumentController.findUserDocument);
router.delete('/deleteupload/:id', async (req: Request, res: Response) => {
    const repository = getCustomRepository(DocumentRepository);
    const document = await repository.findOne(req.params.id);

    if(!document){
      return res.status(400).json({ message: 'document not found' })
    }
    console.log(document);
    await repository.remove(document!);
    return res.json(document);
});
export default router;

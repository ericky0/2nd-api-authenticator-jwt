import DocumentRepository from '../repositories/DocumentRepository';
import {request, Request, Response} from 'express';
import { getCustomRepository } from 'typeorm';
import Document from '../models/Document';
import UserRepository from '../repositories/UserRepository';

class DocumentController {

    static async createDocument (req: Request, res: Response) {
        const {originalname: name, size, filename: key } = req.file;
        const userReq = req.body.userId;
        const userRepository = getCustomRepository(UserRepository);
        const user = await userRepository.findOne(userReq);
        const repository = getCustomRepository(DocumentRepository);
        const post = repository.create({
            name,
            key,
            size,
            user: user,
            url: '',
            description: ''
        })

        await repository.save(post);

        return res.json(post);
    }

    static async findDocumentsById (req: Request, res: Response){
        const repository = getCustomRepository(DocumentRepository);
        const id = req.params.id;
        const documents = await repository.find();
        const updatedDocuments = documents.filter(document => document.user.id === id);
        if(!updatedDocuments){
            return res.status(400).json({ message: 'document not found' })
          }
        res.json(updatedDocuments);
    }

    static async findUserDocument (req: Request, res: Response){
        const repository = getCustomRepository(DocumentRepository);
        const id = req.userId;
        const documents = await repository.find();
        const updatedDocuments = documents.filter(document => document.user.id === id);
        if(!updatedDocuments){
            return res.status(400).json({ message: 'document not found' })
          }
        res.json({documents: updatedDocuments});
    }

    static async listDocuments (req: Request, res: Response){
        const repository = getCustomRepository(DocumentRepository);
        const documents = await repository.find();
        return res.json(documents);
    }
}

export default DocumentController;
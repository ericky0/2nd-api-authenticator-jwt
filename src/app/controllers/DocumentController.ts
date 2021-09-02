import DocumentRepository from '../repositories/DocumentRepository';
import {Request, Response} from 'express';
import { getCustomRepository } from 'typeorm';
import Document from '../models/Document';

class DocumentController {

    static async createDocument (req: Request, res: Response) {
        const {originalname: name, size, filename: key } = req.file;
        const repository = getCustomRepository(DocumentRepository);
        const post = repository.create({
            name,
            key,
            size,
            url: '',
            description: ''
        })

        await repository.save(post);

        return res.json(post);
    }

    static async listDocuments (req: Request, res: Response){
        const repository = getCustomRepository(DocumentRepository);
        const documents = await repository.find();
        return res.json(documents);
    }
}

export default DocumentController;
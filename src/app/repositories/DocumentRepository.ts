import { Repository, EntityRepository } from 'typeorm';
import Document from '../models/Document';

@EntityRepository(Document)
class DocumentRepository extends Repository<Document> {}

export default DocumentRepository;

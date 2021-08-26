import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import PermissionRepository from '../repositories/PermissionRepository';

class PermissionController {
    async create (req: Request, res: Response)  {
        const repository = getCustomRepository(PermissionRepository);
        const { name, description } = req.body;

        const permissionExists = await repository.findOne({name});

        if (permissionExists) {
            return res.status(400).json({err: 'Permission already exists!'})
        }

        const permission = repository.create({
            name,
            description
        });

        await repository.save(permission);
        
        return res.json(permission);
    }
}

export default new PermissionController();

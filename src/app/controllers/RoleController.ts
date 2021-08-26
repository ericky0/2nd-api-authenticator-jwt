import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import RoleRepository from '../repositories/RoleRepository';

class RoleController {
    async create (req: Request, res: Response)  {
        const repository = getCustomRepository(RoleRepository);
        const { name, description } = req.body;

        const roleExists = await repository.findOne({name});

        if (roleExists) {
            return res.status(400).json({err: 'Role already exists!'})
        }

        const role = repository.create({
            name,
            description
        });

        await repository.save(role);
        
        return res.json(role);
    }
}

export default new RoleController();

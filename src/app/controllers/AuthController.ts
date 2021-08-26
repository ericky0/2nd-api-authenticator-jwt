import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/UserRepository';


class AuthController {
    async authenticate(req: Request, res: Response) {

        const repository = getCustomRepository(UserRepository);
        const { email, password } = req.body;

        const user = await repository.findOne({ where: { email }});

        if (!user) {
            return res.status(401).json({error: "E-mail not found"});
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword){
            return res.status(401).json({error: "Incorrect password"});
        }

        const token = jwt.sign({ id: user.id }, 'secret message', {expiresIn: '1d'});
        
        // @ts-expect-error Aqui vai ocorrer um erro, mas estou ignorando
        delete user.password;

        return res.json({
            user,
            token
        })


        
        
    }
}

export default new AuthController();
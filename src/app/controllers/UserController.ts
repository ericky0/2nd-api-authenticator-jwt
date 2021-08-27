import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import User from '../models/User';
import UserRepository from '../repositories/UserRepository';

class UserController {
  static index(req: Request, res: Response) {
    return res.send({ userID: req.userId });
  }

  // criar usuário
  static async create(req: Request, res: Response) {
    const repository = getCustomRepository(UserRepository);
    const { name, email, password } = req.body;

    const userExists = await repository.findOne({ where: { email } });

    if (userExists) {
      return res.status(409).json({ message: 'E-mail already exists!' });
    }

    const user = repository.create({
      name,
      email,
      password,
    });
    await repository.save(user);

    delete user.password;

    return res.status(201).json(user);
  }

  // achar usuário
  static async find(req: Request, res: Response){
    const repository = getCustomRepository(UserRepository);
    const { id } = req.body;

    const user = await repository.findOne({ where: { id } });
    if(!user){
      return res.status(400).json({ message: 'user with this id not found' })
    }
    res.status(201).json(user);
  };

  //listar todos os usuários

  static async listAll(req: Request, res: Response){
    const repository = getCustomRepository(UserRepository);

    const users = await repository.query('SELECT * FROM users');    
    res.json({ users })
  }
}

export default UserController;

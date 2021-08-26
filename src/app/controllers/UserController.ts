import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../repositories/UserRepository';

class UserController {
  static index(req: Request, res: Response) {
    return res.send({ userID: req.userId });
  }

  // criar usuário
  static async store(req: Request, res: Response) {
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
}

export default UserController;

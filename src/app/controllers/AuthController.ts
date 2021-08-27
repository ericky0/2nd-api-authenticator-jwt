import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/UserRepository';

class AuthController {
  static async authenticateLogin(req: Request, res: Response) {
    const repository = getCustomRepository(UserRepository);
    const { email, password } = req.body;

    const user = await repository.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'E-mail not found' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, 'secret message', {
      expiresIn: '1d',
    });

    delete user.password;

    return res.json({
      isAdmin: user.role === 'admin' ? true : false,
      token,
    });
  }
}

export default AuthController;

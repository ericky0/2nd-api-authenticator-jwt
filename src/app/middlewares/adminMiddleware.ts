import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayLoad {
  id: string;
  role: string;
  iat: number;
  exp: number;
}

export default function adminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.sendStatus(401);
  }

  const token = authorization.replace('Bearer', '').trim();

  try {
    const data = jwt.verify(token, 'secret message');
    const { id, role } = data as TokenPayLoad;
    req.userId = id;

    if (!role || role !== 'admin') {
      return res.sendStatus(401);
    }

    return next();
  } catch {
    return res.sendStatus(401);
  }
}

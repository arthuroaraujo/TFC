import { NextFunction, Request, Response } from 'express';
// import * as jwt from 'jsonwebtoken';
import UserService from '../services/UserService';

class TokenMiddleware {
  public static async test(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const token = authorization;

    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const service = new UserService();
    // const secret = process.env.JWT_SECRET || 'jwt_secret';
    // const email = jwt.verify(token, secret) as unknown as string;
    const user = await service.readToken(token);
    if (!user.role) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    next();
  }
}

export default TokenMiddleware;

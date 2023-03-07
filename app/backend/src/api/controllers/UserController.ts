import { Request, Response } from 'express';
import IUser from '../interfaces/IServiceUser';

export default class UserController {
  private _service: IUser;
  constructor(service: IUser) {
    this._service = service;
  }

  async readByEmail(req: Request, res: Response): Promise<Response | void> {
    const { email, password } = req.body;
    try {
      const result = await this._service.readByEmail(email, password);
      res.status(200).json(result);
    } catch (error) {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  }

  async readToken(req: Request, res: Response): Promise<Response | void> {
    const token = req.headers.authorization;
    if (token) {
      const result = await this._service.readToken(token);
      return res.status(200).json(result);
    }
    return res.status(500).json({ message: 'TOKEN_NOT_FOUND' });
  }
}

import { Request, Response } from 'express';
import IUser from '../interfaces/IUser';

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
}

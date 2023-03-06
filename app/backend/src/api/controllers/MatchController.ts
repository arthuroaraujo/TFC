import { Request, Response } from 'express';
import IServiceMatch from '../interfaces/IServiceMatch';

export default class MatchController {
  private _service: IServiceMatch;
  constructor(service: IServiceMatch) {
    this._service = service;
  }

  async readAll(_req: Request, res: Response): Promise<Response | void> {
    try {
      const result = await this._service.readAll();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: 'NOT_FOUND' });
    }
  }
}

import { Request, Response } from 'express';
import IServiceTeam from '../interfaces/IServiceTeam';

export default class TeamController {
  private _service: IServiceTeam;
  constructor(service: IServiceTeam) {
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

  async readById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await this._service.readById(Number(id));
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: 'ID_NOT_FOUND' });
    }
  }
}

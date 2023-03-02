import { Request, Response } from 'express';
import IServiceTeam from '../interfaces/IServiceTeam';

export default class TeamController {
  private _service: IServiceTeam;
  constructor(service: IServiceTeam) {
    this._service = service;
  }

  async readAll(_req: Request, res: Response): Promise<Response | void> {
    const result = await this._service.readAll();
    res.status(200).json(result);
  }

  async readById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this._service.readById(Number(id));
    res.status(200).json(result);
  }
}

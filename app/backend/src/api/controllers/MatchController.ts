import { Request, Response } from 'express';
import IServiceMatch from '../interfaces/IServiceMatch';

export default class MatchController {
  private _service: IServiceMatch;
  constructor(service: IServiceMatch) {
    this._service = service;
  }

  async readAll(req: Request, res: Response): Promise<Response | void> {
    try {
      const { inProgress } = req.query;
      const bool = inProgress === 'true';
      if (inProgress === undefined) {
        const result = await this._service.readAll();
        return res.status(200).json(result);
      }
      const result = await this._service.readByProgress(bool);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: 'NOT_FOUND' });
    }
  }

  async update(req: Request, res: Response): Promise<Response | void> {
    try {
      const { id } = req.params;
      const result = await this._service.update(Number(id));
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: 'NOT_FINISHED' });
    }
  }

  async updateById(req: Request, res: Response): Promise<Response | void> {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;
      const result = await this._service.updateById(
        Number(id),
        Number(homeTeamGoals),
        Number(awayTeamGoals),
      );
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: 'UPDATE_FAILED' });
    }
  }
}

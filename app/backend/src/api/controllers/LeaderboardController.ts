import { Request, Response } from 'express';
import IServiceLeaderboard from '../interfaces/IServiceLeaderboard';

export default class LeaderboardController {
  private _service: IServiceLeaderboard;
  constructor(service: IServiceLeaderboard) {
    this._service = service;
  }

  async readHome(_req: Request, res: Response): Promise<Response | void> {
    try {
      const result = await this._service.readHome();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: 'NOT_FOUND' });
    }
  }

  async readAway(_req: Request, res: Response): Promise<Response | void> {
    try {
      const result = await this._service.readAway();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: 'NOT_FOUND' });
    }
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

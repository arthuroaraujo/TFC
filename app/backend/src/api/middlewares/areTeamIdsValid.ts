import { NextFunction, Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchesMiddleware {
  public static async test(req: Request, res: Response, next: NextFunction) {
    const { homeTeamId, awayTeamId } = req.body;

    if (homeTeamId === awayTeamId) {
      return res.status(422).json(
        { message: 'It is not possible to create a match with two equal teams' },
      );
    }
    const service = new MatchService();
    const matches = await service.readAll();

    const homeTeam = matches.find((match) => match.homeTeamId === homeTeamId);
    const awayTeam = matches.find((match) => match.awayTeamId === awayTeamId);

    if (!homeTeam || !awayTeam) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    next();
  }
}

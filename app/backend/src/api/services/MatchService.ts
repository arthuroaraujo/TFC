import { ModelStatic } from 'sequelize';
import IServiceMatch from '../interfaces/IServiceMatch';
import Match from '../../database/models/Match';
import Team from '../../database/models/Team';

export default class MatchService implements IServiceMatch {
  protected model: ModelStatic<Match> = Match;

  async readAll(): Promise<Match[]> {
    const result = this.model.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    if (!result) throw new Error('NOT_FOUND');
    return result;
  }

  async readByProgress(inProgress: boolean): Promise<Match[]> {
    const result = this.model.findAll({
      where: { inProgress },
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    if (!result) throw new Error('NOT_FOUND');
    return result;
  }
}

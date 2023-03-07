import { ModelStatic } from 'sequelize';
import IServiceMatch from '../interfaces/IServiceMatch';
import Match from '../../database/models/Match';
import Team from '../../database/models/Team';
import IMatch from '../interfaces/IMatch';

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

  async update(id: number): Promise<{ message: string }> {
    const result = await this.model.update(
      {
        inProgress: 'false',
      },
      {
        where: { id },
      },
    );
    if (!result) throw new Error('NOT_FINISHED');
    return { message: 'Finished' };
  }

  async updateById(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<{ message: string }> {
    const result = await this.model.update(
      {
        homeTeamGoals,
        awayTeamGoals,
      },
      {
        where: { id },
      },
    );
    if (!result) throw new Error('UPDATED_FAIL');
    return { message: 'Updated' };
  }

  async create(dto: IMatch): Promise<Match> {
    const result = await this.model.create({ ...dto, inProgress: true });
    return result;
  }
}

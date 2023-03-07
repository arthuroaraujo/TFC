import Match from '../../database/models/Match';
import IMatch from './IMatch';

export default interface IServiceMatch {
  readAll(): Promise<Match[]>;
  readByProgress(inProgress: boolean): Promise<Match[]>;
  update(id: number): Promise<{ message: string }>;
  updateById(
    id: number, homeTeamGoals: number, awayTeamGoals: number
  ): Promise<{ message: string }>;
  create(dto: IMatch): Promise<Match>;
}

import { ModelStatic } from 'sequelize';
import IServiceLeaderboard from '../interfaces/IServiceLeaderboard';
import Team from '../../database/models/Team';
import Match from '../../database/models/Match';
import Scoreboard from './Scoreboard';
import ILeaderboard from '../interfaces/ILeaderboard';

export default class LeaderboardService implements IServiceLeaderboard {
  protected modelMatch: ModelStatic<Match> = Match;
  protected modelTeam: ModelStatic<Team> = Team;

  async readHome(): Promise<ILeaderboard[]> {
    const matches = await this.modelMatch.findAll({ where: { inProgress: 'false' } });
    const teams = await this.modelTeam.findAll();
    const score = teams.map((team) => {
      const object = new Scoreboard(team, matches);
      return object.getHomeScoreboard();
    });
    return score;
  }

  async readAway(): Promise<ILeaderboard[]> {
    const matches = await this.modelMatch.findAll({ where: { inProgress: 'false' } });
    const teams = await this.modelTeam.findAll();
    const score = teams.map((team) => {
      const object = new Scoreboard(team, matches);
      return object.getAwayScoreboard();
    });
    return score;
  }

  async readAll(): Promise<ILeaderboard[]> {
    const matches = await this.modelMatch.findAll({ where: { inProgress: 'false' } });
    const teams = await this.modelTeam.findAll();
    const score = teams.map((team) => {
      const object = new Scoreboard(team, matches);
      return object.getAllScoreboard();
    });
    return score;
  }
}

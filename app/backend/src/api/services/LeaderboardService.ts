import { ModelStatic } from 'sequelize';
import IServiceLeaderboard from '../interfaces/IServiceLeaderboard';
import Team from '../../database/models/Team';
import Match from '../../database/models/Match';
import Scoreboard from './Scoreboard';
import ILeaderboard from '../interfaces/ILeaderboard';

export default class LeaderboardService implements IServiceLeaderboard {
  protected modelMatch: ModelStatic<Match> = Match;
  protected modelTeam: ModelStatic<Team> = Team;

  static async leaderboardSorted(scoreSorted: ILeaderboard[]) {
    scoreSorted.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }
      if (a.totalVictories !== b.totalVictories) {
        return b.totalVictories - a.totalVictories;
      }
      if (a.goalsBalance !== b.goalsBalance) {
        return b.goalsBalance - a.goalsBalance;
      }
      if (a.goalsFavor !== b.goalsFavor) {
        return b.goalsFavor - a.goalsFavor;
      }
      if (a.goalsFavor !== b.goalsFavor) {
        return b.goalsOwn - a.goalsFavor;
      }
      return b.efficiency;
    });
  }

  async readHome(): Promise<ILeaderboard[]> {
    const matches = await this.modelMatch.findAll({ where: { inProgress: 'false' } });
    const teams = await this.modelTeam.findAll();
    const leaderboard = teams.map((team) => {
      const score = new Scoreboard(team, matches);
      return score.getHomeScoreboard();
    });
    await LeaderboardService.leaderboardSorted(leaderboard);

    return leaderboard;
  }

  async readAway(): Promise<ILeaderboard[]> {
    const matches = await this.modelMatch.findAll({ where: { inProgress: 'false' } });
    const teams = await this.modelTeam.findAll();
    const leaderboard = teams.map((team) => {
      const score = new Scoreboard(team, matches);
      return score.getAwayScoreboard();
    });
    await LeaderboardService.leaderboardSorted(leaderboard);

    return leaderboard;
  }

  async readAll(): Promise<ILeaderboard[]> {
    const matches = await this.modelMatch.findAll({ where: { inProgress: 'false' } });
    const teams = await this.modelTeam.findAll();
    const leaderboard = teams.map((team) => {
      const score = new Scoreboard(team, matches);
      return score.getAllScoreboard();
    });
    await LeaderboardService.leaderboardSorted(leaderboard);

    return leaderboard;
  }
}

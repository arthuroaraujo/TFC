import Match from '../../database/models/Match';
import Team from '../../database/models/Team';

export default class Scoreboard {
  name?: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;

  constructor(public team: Team, public matches: Match[]) {
    this.name = team.teamName;
    this.totalPoints = 0;
    this.totalGames = 0;
    this.totalVictories = 0;
    this.totalDraws = 0;
    this.totalLosses = 0;
    this.goalsFavor = 0;
    this.goalsOwn = 0;
    this.goalsBalance = 0;
    this.efficiency = 0;
  }

  public attHomePoints(id: number) {
    this.matches.forEach((match) => {
      if (id === match.homeTeamId) {
        if (match.homeTeamGoals > match.awayTeamGoals) {
          this.totalPoints += 3;
          this.totalVictories += 1;
        } else if (match.homeTeamGoals < match.awayTeamGoals) {
          this.totalLosses += 1;
        } else {
          this.totalPoints += 1;
          this.totalDraws += 1;
        }
        this.totalGames += 1;
        this.goalsFavor += match.homeTeamGoals;
        this.goalsOwn += match.awayTeamGoals;
        this.goalsBalance = (this.goalsFavor - this.goalsOwn);
      }
    });
  }

  public getHomeScoreboard() {
    this.attHomePoints(this.team.id);
    const scoreboardByTeam = {
      name: this.name,
      totalPoints: this.totalPoints,
      totalGames: this.totalGames,
      totalVictories: this.totalVictories,
      totalDraws: this.totalDraws,
      totalLosses: this.totalLosses,
      goalsFavor: this.goalsFavor,
      goalsOwn: this.goalsOwn,
      goalsBalance: this.goalsBalance,
      efficiency: this.efficiency,
    };
    return scoreboardByTeam;
  }

  public attAwayPoints(id: number) {
    this.matches.forEach((match) => {
      if (id === match.awayTeamId) {
        if (match.awayTeamGoals > match.homeTeamGoals) {
          this.totalPoints += 3;
          this.totalVictories += 1;
        } else if (match.awayTeamGoals < match.homeTeamGoals) {
          this.totalLosses += 1;
        } else {
          this.totalPoints += 1;
          this.totalDraws += 1;
        }
        this.totalGames += 1;
        this.goalsFavor += match.awayTeamGoals;
        this.goalsOwn += match.homeTeamGoals;
        this.goalsBalance = (this.goalsFavor - this.goalsOwn);
      }
    });
  }

  public getAwayScoreboard() {
    this.attAwayPoints(this.team.id);
    const scoreboardByTeam = {
      name: this.name,
      totalPoints: this.totalPoints,
      totalGames: this.totalGames,
      totalVictories: this.totalVictories,
      totalDraws: this.totalDraws,
      totalLosses: this.totalLosses,
      goalsFavor: this.goalsFavor,
      goalsOwn: this.goalsOwn,
      goalsBalance: this.goalsBalance,
      efficiency: this.efficiency,
    };
    return scoreboardByTeam;
  }
}

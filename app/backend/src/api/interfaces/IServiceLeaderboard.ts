import ILeaderboard from './ILeaderboard';

export default interface IServiceLeaderboard {
  readHome(): Promise<ILeaderboard[] | void>;
}

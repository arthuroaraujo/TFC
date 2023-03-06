import Match from '../../database/models/Match';

export default interface IServiceMatch {
  readAll(): Promise<Match[]>;
  readByProgress(inProgress: boolean): Promise<Match[]>;
}

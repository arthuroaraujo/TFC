// import User from '../../database/models/User';

export default interface IUser {
  readToken(token: string): Promise<{ role: string }>;
  readByEmail(email: string, password: string): Promise<{ token: string }>;
}

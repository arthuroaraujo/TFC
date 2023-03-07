// import User from '../../database/models/User';

export default interface IServiceUser {
  readToken(token: string): Promise<{ role: string }>;
  readByEmail(email: string, password: string): Promise<{ token: string }>;
}

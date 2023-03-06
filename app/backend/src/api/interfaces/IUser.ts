// import User from '../../database/models/User';

export default interface IUser {
//   readAll(): Promise<User[]>;
  readByEmail(email: string, password: string): Promise<{ token: string }>;
}

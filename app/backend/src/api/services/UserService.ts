import { ModelStatic } from 'sequelize';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import User from '../../database/models/User';
import IUser from '../interfaces/IUser';

export default class UserService implements IUser {
  protected model: ModelStatic<User> = User;

  static async generateToken(email: string) {
    const secret = process.env.JWT_SECRET || 'jwt_secret';
    const token = jwt.sign(email, secret);
    return token;
  }

  async readByEmail(email: string, password: string): Promise<{ token: string }> {
    const user = await this.model.findOne({ where: { email } });
    const isPasswordValid = bcrypt.compareSync(password, user?.password || '');
    if (!user || !isPasswordValid) {
      throw new Error('Invalid email or password');
    }
    const token = await UserService.generateToken(email);
    return { token };
  }
}

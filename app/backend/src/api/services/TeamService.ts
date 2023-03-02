import { ModelStatic } from 'sequelize';
import IServiceTeam from '../interfaces/IServiceTeam';
import Team from '../../database/models/Team';

export default class TeamService implements IServiceTeam {
  protected model: ModelStatic<Team> = Team;

  async readAll(): Promise<Team[]> {
    const result = this.model.findAll();
    return result;
  }

  async readById(id: number): Promise<Team> {
    const result = await this.model.findOne({ where: { id } });
    if (!result) throw new Error('ID_NOT_FOUND');
    return result;
  }
}

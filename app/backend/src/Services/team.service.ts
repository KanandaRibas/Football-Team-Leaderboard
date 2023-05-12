import { ITeam } from '../Interfaces/ITeam';
import Team from '../database/models/TeamModel';

class TeamService {
  constructor(private teamModel = Team) { }

  public async getAll(): Promise<ITeam[]> {
    const teams = await this.teamModel.findAll();
    return teams;
  }

  public async getTeamById(id: string): Promise<ITeam | null> {
    const team = await this.teamModel.findByPk(id);
    return team;
  }
}

export default TeamService;

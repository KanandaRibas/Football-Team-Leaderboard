import { Request, Response } from 'express';
import TeamService from '../Services/team.service';

class TeamController {
  constructor(private teamService = new TeamService()) { }

  public async getAll(_req: Request, res: Response): Promise<Response | void> {
    const teams = await this.teamService.getAll();
    return res.status(200).json(teams);
  }

  public async getTeamById(req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params;
    const team = await this.teamService.getTeamById(id);
    return res.status(200).json(team);
  }
}

export default TeamController;
